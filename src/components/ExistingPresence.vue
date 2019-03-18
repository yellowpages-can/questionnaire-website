<template>
  <section id="existing-presence" class="existing-presence section">
    <FormSectionIntro section="existingPresence" />

    <div class="sub-section">
      <h3 class="sub-section__header">
        {{ $t('existingPresence.headings.existingOnline') }}
      </h3>

      <InputCheckbox handle="presenceTypes" section="existingPresence" />
    </div>

    <!-- display if websites are selected above -->
    <div v-if="checkForPresence('currentWebsitePresence')" class="sub-section">
      <h3 class="sub-section__header">
        {{ $t('existingPresence.headings.currentWebsite') }}
      </h3>

      <InputText handle="domainName" section="existingPresence" />
      <InputRadio handle="domainNameContinue" section="existingPresence" />
      <InputText handle="upToDateInfo" section="existingPresence" />
    </div>

    <!-- display if any social media platforms are selected above -->
    <div v-if="checkForSocials" class="sub-section lg">
      <h3 class="sub-section__header">
        {{ $t('existingPresence.headings.socialMedia') }}
      </h3>

      <p class="sub-section__intro">
        {{ $t('existingPresence.headings.socialMediaIntro') }}
      </p>

      <InputText
        v-if="checkForPresence('facebookPresence')"
        handle="facebook"
        section="existingPresence"
      />
      <InputText
        v-if="checkForPresence('instagramPresence')"
        handle="instagram"
        section="existingPresence"
      />
      <InputText
        v-if="checkForPresence('twitterPresence')"
        handle="twitter"
        section="existingPresence"
      />
      <InputText
        v-if="checkForPresence('otherPresence')"
        handle="other1"
        section="existingPresence"
      />
      <InputText
        v-if="checkForPresence('otherPresence')"
        handle="other2"
        section="existingPresence"
      />
      <InputText
        v-if="checkForPresence('otherPresence')"
        handle="other3"
        section="existingPresence"
      />
    </div>

    <ButtonNav />
  </section>
</template>

<script>
import FormSectionIntro from './FormSectionIntro'
import InputText from './InputText'
import InputCheckbox from './InputCheckbox'
import InputRadio from './InputRadio'
import ButtonNav from './ButtonNav'

import { mapGetters, mapState } from 'vuex'

export default {
  name: 'ExistingPresence',
  components: {
    FormSectionIntro,
    InputText,
    InputCheckbox,
    InputRadio,
    ButtonNav
  },
  computed: {
    ...mapState('translations', ['existingPresence']),
    ...mapGetters('field', ['checkForPresence', 'checkForSocials'])
  }
}
</script>
