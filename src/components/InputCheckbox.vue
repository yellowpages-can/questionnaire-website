<template>
  <div class="form-field__checkbox-container">
    <!-- question text -->
    <span v-if="question" class="form-field__question">
      {{ question }}
    </span>
    <span v-if="contextual" class="form-field__contextual">
      {{ contextual }}
    </span>

    <!-- display all checkbox options -->
    <label v-for="option of options" :key="option.handle" :for="option.handle" class="form-field__label">
      <input
        v-model="value"
        :name="option.handle"
        :id="option.handle"
        :value="option.handle"
        type="checkbox"
        class="form-field__checkbox"
      />

      <!-- checkbox label text -->
      <span class="form-field__checkbox-span">
        {{ option.label }}
      </span>
    </label>
    <!-- <p v-if="error" class="form-field__error">Please fill in this field.</p> -->
  </div>
</template>

<script>
export default {
  name: 'InputCheckbox',
  props: {
    handle: { type: String, required: true },
    section: { type: String, required: true },
    filteredOptions: { type: Array, required: false, default: null }
  },
  computed: {
    // v-model with store
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

    // get question text from i18n
    question () {
      const prop = this.$i18n.t(`${this.section}.questions.${this.handle}`)

      const localizedCheck = prop.split('.')

      if (localizedCheck[0] === this.section &&
        localizedCheck[1] === 'questions' &&
        localizedCheck[2] === this.handle) {
        return null
      }

      // t() returning fallback str, not null
      switch (typeof prop) {
        case 'undefined': return null
        case 'string': return prop
        default:
          this.contextual = prop.contextual
          return prop.question
      }
    },

    // get answer options from i18n
    options () {
      return this.filteredOptions
        ? this.filteredOptions
        : this.$i18n.t(`${this.section}.answers.${this.handle}`)
    }
  },
  data () {
    return {
      contextual: null
    }
  }
}
</script>
