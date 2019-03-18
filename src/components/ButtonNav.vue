<template>
  <nav class="button-navigation" :aria-labelledby="`${$store.state.activeTab}-button-navigation`">
    <button @click.prevent="navigate('forward')" class="button">
      {{ $t('misc.buttonNav.next') }}
    </button>

    <button
      @click.prevent="navigate('backward')"
      v-show="$store.state.activeTab !== 'businessDetails'"
      class="button">
      {{ $t('misc.buttonNav.previous') }}
    </button>
  </nav>
</template>

<script>
export default {
  name: 'ButtonNav',
  methods: {
    navigate (direction) {
      // store navigation action
      this.$store.dispatch('navigate', { direction })
    }
  }
}
</script>
