<template>
  <section id="products-and-services" class="products-and-services section">
    <FormSectionIntro section="productsServices" />

    <div class="sub-section high-level">
      <div class="form-panel__vertical">
        <h3 class="sub-section__header">
          {{ $t('productsServices.headings.businessType') }}
        </h3>
        <InputCheckbox handle="verticals" section="productsServices" />
      </div>

      <div class="form-panel__sub-verticals">
        <div
          v-for="vertical of getSelectedVerticals"
          :key="vertical.handle"
          class="form-panel__sub-vertical-container">
          <h3 class="form-field__question">
            {{ vertical.label }}
          </h3>
          <InputCheckbox
            handle="subverticals"
            section="productsServices"
            :filteredOptions="getSubverticalOptions(vertical.handle)"
          />
        </div>
      </div>
    </div>

    <div v-if="psState.subverticals.length > 0" class="sub-section low-level">
      <div v-for="sub of getSubVerticalRefs" class="form-panel__vertical-specifics" :key="sub.handle">
        <h3 class="sub-section__header">
          {{ sub.label }}
        </h3>
        <div
          v-for="optionObj of getSpecificsOptions(sub.handle)"
          :key="optionObj.handle"
          class="form-panel__vertical-specifics-container">
          <p class="form-field__question">
            {{ optionObj.title }}
          </p>
          <button
            @click.prevent="checkAllSpecifics(optionObj.handle)"
            class="checkAll button">
            &plus; {{ $t('misc.checkAll') }}
          </button>
          <InputCheckbox
            handle="verticalSpecifics"
            section="productsServices"
            :filteredOptions="optionObj.options"
            :key="optionObj.handle">
          </InputCheckbox>
        </div>
      </div>
    </div>

    <div class="sub-section">
      <InputText handle="otherProductsServices" section="productsServices" type="textarea" />
    </div>

    <ButtonNav />
  </section>
</template>

<script>
import FormSectionIntro from './FormSectionIntro'
import InputCheckbox from './InputCheckbox'
import InputText from './InputText'
import ButtonNav from './ButtonNav'

import { mapState } from 'vuex'

export default {
  name: 'ProductsServices',
  components: {
    FormSectionIntro,
    InputCheckbox,
    InputText,
    ButtonNav
  },
  computed: {
    ...mapState('field', {
      psState: state => state.productsServices
    }),

    // for each selected high level vertical handle in store
    // search array of high level vertical string objects
    // return current selected verticals' string object
    getSelectedVerticals () {
      return this.psState.verticals.map(vertical => {
        return this.$i18n.t('productsServices.answers.verticals').find(stringObject => {
          return stringObject.handle === vertical
        })
      })
    },

    // for each selected low level vertical handle in store
    // search array of low level vertical string objects
    // return current selected verticals' string object
    getSubVerticalRefs () {
      return this.psState.subverticals.map(vertical => {
        return this.$i18n.t('productsServices.answers.subverticals').find(stringObject => stringObject.handle === vertical)
      })
    }
  },
  methods: {
    // return all low level verticals in format that InputCheckbox requires
    getSubverticalOptions (handle) {
      return this.$i18n.t('productsServices.answers.subverticals').filter(sub => sub.parent === handle)
    },

    // return all low level vertical specifics' string objects
    getSpecificsOptions (handle) {
      return this.$i18n.t('productsServices.answers.verticalSpecifics').filter(item => item.parent === handle)
    },

    checkAllSpecifics (handle) {
      this.$store.dispatch('field/checkAll', {
        section: 'productsServices',
        handle
      })
    }
  }
}
</script>
