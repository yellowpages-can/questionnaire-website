<template>
  <ul
    :class="['tab-navigation', $i18n.locale === 'en' ? null : 'fr']"
    aria-labelledby="tab-navigation">
    <li
      v-for="tab in $t('misc.tabNav')"
      @click="navigate(tab.handle)"
      @keyup.space="navigate(tab.handle)"
      :key="tab.handle"
      :class="['tab', tab.handle === $store.state.activeTab ? 'active' : null]"
      tabindex="0"
      :aria-current="tab.handle === $store.state.activeTab ? 'page' : null">
      {{ tab.label }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TabNav',
  methods: {
    navigate (clicked) {
      // store navigation action
      this.$store.dispatch('navigate', { clicked })
    }
  }
}
</script>
