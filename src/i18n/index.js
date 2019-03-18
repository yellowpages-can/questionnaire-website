import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: '',
  fallbackLocale: 'en',
  messages: {
    en: {},
    fr: {}
  }
})

const loadedLanguages = []

export const formTabs = [
  'businessDetails',
  'existingPresence',
  'productsServices',
  'yourAudience',
  'finishQuestionnaire'
]

const partials = [...formTabs, 'misc']

function setI18nLanguage (lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

function loadLanguagePartials (lang) {
  const partialPromises = partials.map(partial => {
    return axios.get(`/static/translations/${lang}/${partial}.json`)
  })

  return axios.all(partialPromises)
    .then(axios.spread((...args) => {
      const messageObj = {}

      args.map(({ data }) => { messageObj[data.handle] = data })

      i18n.setLocaleMessage(lang, messageObj)
    }))
    .then(() => {
      loadedLanguages.push(lang)
      return setI18nLanguage(lang)
    })
}

export function loadLanguageAsync (lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return Promise.resolve(loadLanguagePartials(lang))
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}

export default i18n
