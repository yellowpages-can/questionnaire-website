<template>
  <div class="intro sub-section">
    <h1 class="section__header">
      {{ main }}
    </h1>

    <h3 class="sub-section__header">
      {{ sub }}
    </h3>

    <p slot="en" class="sub-section__intro">
      {{ mainIntro }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'FormSectionIntro',
  props: {
    section: { required: true, type: String }
  },
  computed: {
    // get tab name from store
    main () {
      return this.$i18n.t(`${this.section}.headings.main`)
    },

    // get intro title from store
    sub () {
      return this.$i18n.t(`${this.section}.headings.sub`)
    },

    // get intro text from store
    mainIntro () {
      return this.$i18n.t(`${this.section}.headings.mainIntro`)
    }
  }
}
</script>
