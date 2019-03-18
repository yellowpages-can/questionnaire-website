<template>
  <section id="business-details" class="business-details section">
    <!-- introduction sub-section -->
    <FormSectionIntro section="businessDetails" />

    <!-- sub-section with form fields -->
    <div class="sub-section lg">
      <!-- sub-section header -->
      <h3 class="sub-section__header">
        {{ $t('businessDetails.headings.businessInfo') }}
      </h3>

      <!-- sub-section introduction text -->
      <p class="sub-section__intro">
        {{ $t('businessDetails.headings.businessInfoIntro') }}
      </p>

      <InputText handle="displayedName" section="businessDetails" />
      <InputText handle="primaryContact" section="businessDetails" />
      <InputCheckbox handle="displayedInfo" section="businessDetails" />
      <InputText handle="email" section="businessDetails" />

      <fieldset>
        <InputText handle="mainPhone" section="businessDetails" />
        <InputText handle="otherPhone" section="businessDetails" />
      </fieldset>

      <fieldset>
        <InputText handle="mainAddress" section="businessDetails" />
        <InputText handle="otherAddress" section="businessDetails" />
      </fieldset>
    </div>

    <div class="sub-section">
      <h3 class="sub-section__header">
        {{ $t('businessDetails.headings.hours') }}
      </h3>

      <InputOperationHours section="businessDetails" />
    </div>

    <div class="sub-section">
      <InputText handle="otherInfo" section="businessDetails" type="textarea" />
    </div>

    <ButtonNav />
  </section>
</template>

<script>
import FormSectionIntro from '@/components/FormSectionIntro'
import InputOperationHours from '@/components/InputOperationHours'
import InputCheckbox from '@/components/InputCheckbox'
import InputText from '@/components/InputText'
import ButtonNav from '@/components/ButtonNav'

import { mapState } from 'vuex'

export default {
  name: 'BusinessDetails',
  components: {
    FormSectionIntro,
    InputOperationHours,
    InputCheckbox,
    InputText,
    ButtonNav
  },
  computed: mapState('translations', ['businessDetails'])
}
</script>
