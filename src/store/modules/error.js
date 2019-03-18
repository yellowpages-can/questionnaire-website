export default {
  namespaced: true,
  state: {
    // true === display error messages below fields
    showErrors: false,

    // true === error present on field
    businessDetails: {
      displayedName: true,
      primaryContact: true,
      mainPhone: true
    },
    productsServices: {},
    existingPresence: {},
    yourAudience: {},
    finishQuestionnaire: {}
  },
  actions: {
    checkStateFromLocal: ({ state, commit }, storageState) => {
      // loop through sections
      for (let section of Object.keys(state)) {
        // ignore showErrors
        if (section === 'showErrors') continue

        // loop through required fields of that section
        for (let field of Object.keys(state[section])) {
          // send value from storage state to error checker
          commit('update', {
            section,
            handle: field,
            value: storageState[section][field]
          })
        }
      }
    }
  },
  mutations: {
    // check if any value is present
    update: (state, { section, handle, value }) => {
      state[section][handle] = value.length === 0
    },

    // toggle errors on blur
    toggleErrors: (state, visibility) => { state.showErrors = visibility }
  }
}
