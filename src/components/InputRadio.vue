<template>
  <div class="form-field__radio-container">
    <!-- question text -->
    <span class="form-field__question">
      {{ question }}
    </span>
    <span v-if="contextual" class="form-field__contextual">
      {{ contextual }}
    </span>

    <label v-for="key of Object.keys(options)" :key="key" :for="key" class="form-field__label">
      <input
        v-model="value"
        :name="key"
        :id="key"
        :value="key"
        type="radio"
        class="form-field__radio"
      />
      <span class="form-field__radio-span">
        {{ options[key] }}
      </span>
    </label>
    <!-- <p v-if="error" class="form-field__error">Please fill in this field.</p> -->
  </div>
</template>

<script>
export default {
  name: 'InputRadio',
  props: {
    handle: { type: String, required: true },
    section: { type: String, required: true }
  },
  computed: {
    value: {
      get () {
        return this.$store.state.field[this.section][this.handle]
      },
      set (value) {
        this.$store.dispatch('field/update', {
          handle: this.handle,
          section: this.section,
          value
        })
      }
    },

    // get question text from store
    question () {
      const prop = this.$i18n.t(`${this.section}.questions.${this.handle}`)

      if (typeof prop === 'string') {
        return prop
      } else {
        return prop.question
      }
    },

    // get contextual text from store
    contextual () {
      const prop = this.$i18n.t(`${this.section}.questions.${this.handle}`)

      if (prop.contextual) {
        return prop.contextual
      } else {
        return null
      }
    },

    // get answer options from store
    options () {
      return this.$i18n.t(`${this.section}.answers.${this.handle}`)
    }
  }
}
</script>
