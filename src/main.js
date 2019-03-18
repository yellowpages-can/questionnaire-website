// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Polyfills
import 'core-js/es6/promise'
import 'core-js/fn/array/find-index'
import 'core-js/fn/array/find'
import 'core-js/fn/array/includes'
import 'core-js/fn/object/values'

import Vue from 'vue'
import store from '@/store'
import i18n from '@/i18n'
import Questionnaire from './Questionnaire'

Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  el: '#questionnaire',
  store,
  i18n,
  template: '<Questionnaire/>',
  components: { Questionnaire }
})

if (process.env.NODE_ENV !== 'production') window['vue'] = app

export default app
