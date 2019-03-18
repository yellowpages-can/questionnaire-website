<template>
  <ul
    class="lang-navigation"
    aria-labelledby="language-navigation">
    <li
      v-for="lang in langs"
      @click="toggleLanguage(lang)"
      @keyup.space="toggleLanguage(lang)"
      :key="lang"
      :class="['tab', lang === $i18n.locale ? 'active' : null]"
      tabindex="0"
      :aria-current="lang === $i18n.locale ? 'page' : null">
      {{ lang }}
    </li>
  </ul>
</template>

<script>
import { loadLanguageAsync } from '@/i18n'

export default {
  name: 'LanguageToggle',
  data () {
    return {
      langs: ['en', 'fr']
    }
  },
  methods: {
    toggleLanguage (lang) {
      // set new locale
      loadLanguageAsync(lang)
    }
  }
}
</script>
