<template>
  <section id="your-audience" class="your-audience section">
    <FormSectionIntro section="yourAudience" />

    <div class="sub-section lg">
      <h3 class="sub-section__header">
        {{ $t('yourAudience.headings.theVisuals') }}
      </h3>
      <i18n path="yourAudience.headings.theVisualsIntro" tag="p" class="sub-section__intro">
        <a place="link" href="http://www.portfolio.yellowpages.ca/" target="_blank" rel="noopener">
          {{ $t('yourAudience.headings.theVisualsLink') }}
        </a>
      </i18n>

      <InputText handle="example1" section="yourAudience" />
      <InputText handle="example2" section="yourAudience" />
      <InputText handle="example3" section="yourAudience" />
    </div>

    <div class="sub-section">
      <h3 class="sub-section__header">
        {{ $t('yourAudience.headings.demographic') }}
      </h3>

      <InputText handle="targetDemo" section="yourAudience" type="textarea" />
      <InputText handle="firstThing" section="yourAudience" type="textarea" />
      <InputCheckbox handle="suppliedContent" section="yourAudience" />
      <InputText handle="stockImagesSubjects" section="yourAudience" type="textarea" />
    </div>

    <ButtonNav />
  </section>
</template>

<script>
import FormSectionIntro from './FormSectionIntro'
import InputText from './InputText'
import InputCheckbox from './InputCheckbox'
import ButtonNav from './ButtonNav'

export default {
  name: 'YourAudience',
  components: {
    FormSectionIntro,
    InputText,
    InputCheckbox,
    ButtonNav
  }
}
</script>
