import i18n from '@/i18n'

export default {
  namespaced: true,
  state: {
    businessDetails: {
      primaryContact: '',
      displayedName: '',
      displayedInfo: [],
      mainPhone: '',
      otherPhone: '',
      email: '',
      mainAddress: '',
      otherAddress: '',
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
      otherInfo: ''
    },
    productsServices: {
      verticals: [],
      subverticals: [],
      verticalSpecifics: [],
      otherProductsServices: '',
      mailData: []
    },
    existingPresence: {
      presenceTypes: [],
      domainName: '',
      domainNameContinue: '',
      upToDateInfo: '',
      facebook: '',
      instagram: '',
      twitter: '',
      other1: '',
      other2: '',
      other3: ''
    },
    yourAudience: {
      example1: '',
      example2: '',
      example3: '',
      targetDemo: '',
      firstThing: '',
      suppliedContent: [],
      stockImagesSubjects: ''
    }
  },
  getters: {
    // check for supplied presence in selected presence array
    checkForPresence: state => type => state.existingPresence.presenceTypes.includes(type),

    // true if any social media presences are selected in presence array
    checkForSocials: state => {
      const presences = state.existingPresence.presenceTypes
      return (presences.length === 1 && !presences.includes('currentWebsitePresence')) || presences.length >= 2
    }
  },
  actions: {
    update: ({ commit, dispatch }, payload) => {
      // update state
      commit('update', payload)

      // forward to error tracking
      commit('error/update', payload, { root: true })

      // store in local storage
      dispatch('storeLocal')
    },

    checkAll: ({ dispatch, state, commit }, { section, handle }) => {
      const verticalSpecifics = i18n.t(`${section}.answers.verticalSpecifics`)
      const specificOptions = verticalSpecifics.find(specific => specific.handle === handle).options

      for (let option of specificOptions) {
        const payload = {
          section,
          handle: 'verticalSpecifics',
          value: [option.handle, ...state[section]['verticalSpecifics']]
        }

        if (!state[section]['verticalSpecifics'].includes(option.handle)) {
          commit('update', payload)
        }
      }

      dispatch('storeLocal')
    },

    copyToAll: ({ dispatch, commit }, { section, recipients, value }) => {
      for (let recipient of recipients) {
        const payload = {
          section,
          handle: recipient,
          value
        }

        commit('update', payload)

        dispatch('storeLocal')
      }
    },

    // format Products Services object for mail endpoint
    constructMailData: ({ state, commit }) => {
      // final state === [
      //   {
      //     title: '...', <- sub vertical's title
      //     specifics: [  <- specific service that contains selected option(s)
      //       {
      //         title: '...' <- specific service's title
      //         selections: ['...', '...'] <- selected specific services
      //       }
      //     ]
      //   }
      // ]
      const postArr = []

      // for each selected low vertical handle
      for (let sub of state.productsServices.subverticals) {
        // subvertical string object
        const subvertical = i18n.t('productsServices.answers.subverticals').find(string => string.handle === sub)

        // get array of string objects for currently selected specifics
        const filteredSpecificsStrings = i18n.t('productsServices.answers.verticalSpecifics').filter(stringObj => {
          // current subvertical === current specific's parent
          const parentTruthy = sub === stringObj.parent

          // if any of current specific's options are selected
          const childTruthy = stringObj.options.reduce((truthy, option) => {
            return (state.productsServices.verticalSpecifics.includes(option.handle) || truthy)
          }, false)

          return parentTruthy && childTruthy
        })

        let formattedSpecifics = []

        // for each specific with a selected option
        for (let selection of filteredSpecificsStrings) {
          // remove unselected options
          const flattened = selection.options.filter(option => {
            return state.productsServices.verticalSpecifics.includes(option.handle)
          })
            // only add correct language string
            .map(option => option.label)

          // push new array with specific's title
          formattedSpecifics.push({
            title: selection.title,
            selections: flattened
          })
        }

        // push subvertical (with specifics array) to new object
        postArr.push({
          title: subvertical.label,
          specifics: formattedSpecifics
        })
      }

      commit('update', {
        section: 'productsServices',
        handle: 'mailData',
        value: postArr
      })
    },

    // check Local Storage for state
    checkLocal: ({ commit, dispatch }) => {
      if (localStorage.getItem('yp-questionnaire')) {
        const storageState = JSON.parse(localStorage.getItem('yp-questionnaire'))
        if (typeof storageState.businessDetails.primaryContact !== 'undefined') {
          commit('replaceState', storageState)
          dispatch('error/checkStateFromLocal', storageState, { root: true })
        }
      }
    },

    // store state in Local Storage
    storeLocal: ({ state }) => {
      const storageString = JSON.stringify(state)
      localStorage.setItem('yp-questionnaire', storageString)
    }
  },
  mutations: {
    update: (state, { section, handle, value }) => {
      state[section][handle] = value
    },
    replaceState: (state, payload) => { Object.assign(state, payload) }
  }
}
