<template>
  <!-- required and error classes attached here -->
  <label
    :for="handle"
    :class="[
      'form-field__label',
      required ? 'required' : null,
      (errorPresent && showErrors) ? 'error' : null
    ]">

    <!-- question text -->
    <span class="form-field__question">
      {{ question }}
    </span>
    <span v-if="contextual" class="form-field__contextual">
      {{ contextual }}
    </span>

    <button
      v-if="enableCopy"
      @click.prevent="$emit('copyToAll', value)"
      class="checkAll button">
      &plus; {{ $t('misc.copyToAll') }}
    </button>

    <!-- display if textarea question -->
    <textarea
      v-if="type === 'textarea'"
      v-model.lazy="value"
      :name="handle"
      :id="handle"
      rows="5"
      cols="30">
    </textarea>
    <input
      v-else
      v-model.lazy="value"
      :name="handle"
      :id="handle"
      type="text"
    />

    <!-- error text -->
    <p v-if="(errorPresent && showErrors)" class="form-field__error">
      {{ $t('misc.errors.required') }}
    </p>
  </label>
</template>

<script>
export default {
  name: 'InputText',
  props: {
    handle: { type: String, required: true },
    section: { type: String, required: true },
    type: { type: String, required: false, default: 'text' },
    enableCopy: { type: Boolean, default: false }
  },
  computed: {
    // v-model with store, on blur
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

    // returns bool
    required () {
      return Object.keys(this.$store.state.error[this.section]).includes(this.handle)
    },

    // return true if this field is required and empty
    errorPresent () {
      if (this.required) { return this.$store.state.error[this.section][this.handle] }
    },

    // return true if navigation was attempted with errors present
    showErrors () {
      return this.$store.state.error.showErrors
    }
  }
}
</script>
