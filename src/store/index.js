import Vue from 'vue'
import Vuex from 'vuex'
// import i18n from '@/i18n'
import axios from 'axios'

import field from './modules/field'
import error from './modules/error'
import { formTabs } from '@/i18n'
// import translations from './modules/translations'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  modules: { field, error },
  state: {
    // visible form tab
    activeTab: 'businessDetails',

    // unsubmitted -> submitting -> submitted || error
    submitStatus: 'unsubmitted'
  },
  getters: {
    // true if English, false if French
    // inEnglish: () => i18n.locale !== 'fr',

    // index of current tab in translations tab nav array
    currentTabIndex: (state, getters) => {
      return formTabs.findIndex(tab => tab === state.activeTab) || 0
    },

    // true if req. field not filled in on current tab
    errorOnTab: state => {
      if (error.state[state.activeTab]) {
        return Object.values(error.state[state.activeTab]).reduce((truthy, field) => {
          return truthy || field
        }, false)
      }
    }
  },
  mutations: {
    navigate: (state, handle) => { state.activeTab = handle },
    setSubmitStatus: (state, status) => { state.submitStatus = status }
  },
  actions: {
    // navigate when next/prev button or tabs are clicked
    navigate: ({ state, getters, commit, dispatch }, { direction, clicked }) => {
      let newIndex = null

      if (direction) {
        // prev/next was clicked
        newIndex = direction === 'forward' ? getters.currentTabIndex + 1 : getters.currentTabIndex - 1
      } else if (clicked) {
        // tab nav was clicked
        newIndex = formTabs.findIndex(tab => tab === clicked)
      }

      const handle = formTabs[newIndex]

      if (handle && !getters.errorOnTab) {
        // successful nav
        commit('navigate', handle)
        commit('error/toggleErrors', false)
      } else {
        // no nav
        commit('error/toggleErrors', true)
      }

      // reset page scroll to top
      window.scroll(0, 0)
    },

    // submit form to mail endpoint
    submit: ({ state, commit, dispatch }) => {
      commit('setSubmitStatus', 'submitting')

      dispatch('field/constructMailData')

      const postObject = {
        businessDetails: state.field.businessDetails,
        productsServices: {
          otherProductsServices: state.field.productsServices.otherProductsServices,
          mailData: state.field.productsServices.mailData
        },
        existingPresence: state.field.existingPresence,
        yourAudience: state.field.yourAudience,
        browserLang: state.browserLang
      }

      // Testing
      axios.post('https://httpbin.org/post', postObject, { 'Content-Type': 'application/json' })
        .then(({ data }) => {
          commit('setSubmitStatus', 'submitted')
          console.log(data)
        })
        .catch(err => console.log(err))

      // Mail
      // axios.post('http://yp.advertiserprofile.ca/mail/index.php', postObject, { 'Content-Type': 'application/json' })
      //   .then(({ data }) => {
      //     // successful submission
      //     commit('setSubmitStatus', 'submitted')

      //     // remove local storage string
      //     if (localStorage.getItem('yp-questionnaire')) {
      //       localStorage.removeItem('yp-questionnaire')
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err)

      //     // display error message
      //     commit('setSubmitStatus', 'error')
      //   })
    }
  }
})
