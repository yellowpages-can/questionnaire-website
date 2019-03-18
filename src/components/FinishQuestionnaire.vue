<template>
  <section
    id="finish-questionnaire"
    :class="['finish-questionnaire', 'section', submitStatus]">

    <FormSectionIntro section="finishQuestionnaire" />

    <!-- display if unsubmitted for any reason -->
    <div v-if="submitStatus !== 'submitted'" class="submit-section">
      <button
        type="submit"
        class="button">
        <LoadingSpinner v-if="submitStatus === 'submitting'" />
        {{ $t('finishQuestionnaire.buttons.complete') }}
      </button>

      <!-- error message -->
      <span
        v-if="submitStatus === 'error'"
        class="error">
        <!-- SVG from https://fontawesome.com -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"/></svg>
        {{ $t('misc.errors.submitFailure') }}
      </span>
    </div>

    <!-- display if successful submit -->
    <transition name="slide-fade" mode="out-in">
      <div v-show="submitStatus === 'submitted'" class="sub-section thank-you">
        <h3 class="sub-section__header">
          {{ $t('finishQuestionnaire.headings.thankYou') }}
        </h3>

        <div class="thank-you__container">
          <!-- PDF leave behind -->
          <div class="thank-you__third">
            <p class="sub-section__intro">
              {{ $t('finishQuestionnaire.headings.leaveBehind') }}
            </p>
            <a
              class="button"
              :href="inEnglish ? '/uploads/welcome_to_your_website-en.pdf' : '/uploads/welcome_to_your_website-fr.pdf'"
              target="_blank"
              rel="noopener">
              {{ $t('finishQuestionnaire.buttons.leaveBehind') }}
            </a>
          </div>

          <!-- web portfolio -->
          <div class="thank-you__third">
            <p class="sub-section__intro">
              {{ $t('finishQuestionnaire.headings.portfolio') }}
            </p>
            <a
              class="button"
              :href="inEnglish ? 'http://www.portfolio.yellowpages.ca/' : 'http://www.portfolio.yellowpages.ca/index_fr.html'"
              target="_blank"
              rel="noopener">
              {{ $t('finishQuestionnaire.buttons.portfolio') }}
            </a>
          </div>

          <!-- YP4Business -->
          <div class="thank-you__third">
            <p class="sub-section__intro">
              {{ $t('finishQuestionnaire.headings.yp4b') }}
            </p>
            <a
              class="button"
              href="https://business.yellowpages.ca/"
              target="_blank"
              rel="noopener">
              {{ $t('finishQuestionnaire.buttons.yp4b') }}
            </a>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import FormSectionIntro from './FormSectionIntro'
import LoadingSpinner from './LoadingSpinner'

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'FinishQuestionnaire',
  components: {
    FormSectionIntro,
    LoadingSpinner
  },
  computed: {
    ...mapState(['submitStatus']),
    ...mapGetters(['inEnglish'])
  }
}
</script>
