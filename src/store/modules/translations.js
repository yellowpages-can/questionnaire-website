// import axios from 'axios'
import { i18n, loadLanguageAsync } from '@/i18n'

export default {
  namespaced: true,
  state: {
    // 'en' or 'fr'
    browserLang: document.documentElement.lang || 'en',
    initialLoaded: false
    // businessDetails: {
    //   done: false,
    //   headings: {
    //     main: '',
    //     sub: '',
    //     mainIntro: '',
    //     businessInfo: '',
    //     businessInfoIntro: '',
    //     hours: ''
    //   },
    //   questions: {
    //     displayedName: { question: '', contextual: '' },
    //     primaryContact: { question: '', contextual: '' },
    //     displayedInfo: '',
    //     mainPhone: '',
    //     otherPhone: '',
    //     email: '',
    //     mainAddress: '',
    //     otherAddress: '',
    //     monday: '',
    //     tuesday: '',
    //     wednesday: '',
    //     thursday: '',
    //     friday: '',
    //     saturday: '',
    //     sunday: '',
    //     otherInfo: ''
    //   },
    //   answers: {
    //     displayedInfo: []
    //   }
    // },
    // productsServices: {
    //   done: false,
    //   headings: {
    //     main: '',
    //     sub: '',
    //     mainIntro: '',
    //     businessType: ''
    //   },
    //   questions: {
    //     otherProductsServices: ''
    //   },
    //   answers: {
    //     verticals: [],
    //     subverticals: [],
    //     verticalSpecifics: []
    //   }
    // },
    // existingPresence: {
    //   done: false,
    //   headings: {
    //     main: '',
    //     sub: '',
    //     mainIntro: '',
    //     existingOnline: '',
    //     currentWebsite: '',
    //     socialMedia: '',
    //     socialMediaIntro: ''
    //   },
    //   questions: {
    //     presenceTypes: '',
    //     domainName: { question: '', contextual: '' },
    //     domainNameContinue: { question: '', contextual: '' },
    //     upToDateInfo: { question: '', contextual: '' },
    //     facebook: '',
    //     instagram: '',
    //     twitter: '',
    //     other1: '',
    //     other2: '',
    //     other3: ''
    //   },
    //   answers: {
    //     presenceTypes: [],
    //     domainNameContinue: []
    //   }
    // },
    // yourAudience: {
    //   done: false,
    //   headings: {
    //     main: '',
    //     sub: '',
    //     mainIntro: '',
    //     theVisuals: '',
    //     theVisualsLink: '',
    //     theVisualsIntro: '',
    //     demographic: ''
    //   },
    //   questions: {
    //     example1: '',
    //     example2: '',
    //     example3: '',
    //     targetDemo: { question: '', contextual: '' },
    //     firstThing: { question: '', contextual: '' },
    //     suppliedContent: { question: '', contextual: '' },
    //     stockImagesSubjects: { question: '', contextual: '' }
    //   },
    //   answers: {
    //     suppliedContent: []
    //   }
    // },
    // finishQuestionnaire: {
    //   done: false,
    //   headings: {
    //     main: '',
    //     sub: '',
    //     mainIntro: '',
    //     thankYou: '',
    //     leaveBehind: '',
    //     portfolio: '',
    //     yp4b: ''
    //   },
    //   buttons: {
    //     complete: '',
    //     leaveBehind: '',
    //     portfolio: '',
    //     yp4b: ''
    //   }
    // },
    // misc: {
    //   tabNav: [],
    //   buttonNav: {},
    //   errors: {},
    //   checkAll: ''
    // }
  },
  getters: {},
  actions: {
    // getTranslations: ({ state, rootState, commit }) => {
    //   const sections = Object.keys(state)
    //   const initialSection = rootState.activeTab

    //   const getFirstSection = () => axios.get(`/static/translations/${state.browserLang}/${initialSection}.json`)
    //   const getMiscStrings = () => axios.get(`/static/translations/${state.browserLang}/misc.json`)

    //   // couple nav strings and first section strings to load together
    //   axios.all([getFirstSection(), getMiscStrings()])
    //     .then(axios.spread((first, misc) => {
    //       commit('replaceStrings', { data: misc.data, section: 'misc' })
    //       commit('replaceStrings', { data: first.data, section: initialSection })
    //       commit('asyncComplete', { section: initialSection })
    //     }))
    //     .catch(err => console.log(err))

    //   for (let section of sections) {
    //     // only get the rest of the sections
    //     if (section === initialSection || section === 'misc' || section === 'browserLang' | section === 'initialLoad') continue

    //     commit('asyncIncomplete', { section })

    //     axios.get(`/static/translations/${state.browserLang}/${section}.json`)
    //       .then(({ data }) => {
    //         commit('replaceStrings', { data, section })
    //         commit('asyncComplete', { section })
    //       })
    //   }
    // },

    getTranslations: ({ state, commit }) => {
      const isInitialLoad = i18n.locale === ''

      loadLanguageAsync(state.browserLang)
        .then(() => {
          commit('initialLoaded', { isInitialLoad })
        })
    },

    // toggle between languages
    toggleLanguage: ({ state, commit, dispatch }, { lang }) => {
      // new language in this store
      commit('toggleLanguage', lang)

      // fetch new strings
      dispatch('getTranslations')

      // reset page scroll to top
      window.scroll(0, 0)
    }
  },
  mutations: {
    // replaceStrings: (state, { data, section }) => { Object.assign(state[section], data) },
    // asyncComplete: (state, { section }) => { state[section]['done'] = true },
    // asyncIncomplete: (state, { section }) => { state[section]['done'] = false },
    // toggleLanguage: (state, lang) => { state.browserLang = lang }
    initialLoaded: (state, { isInitialLoad }) => { state.initialLoaded = !isInitialLoad }
  }
}
