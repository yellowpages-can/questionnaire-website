<template>
  <main id="questionnaire" class="questionnaire">
    <nav v-if="messagesLoaded" class="main-navigation">
      <LanguageToggle />
      <TabNav />
    </nav>

    <form @submit.prevent="$store.dispatch('submit')" class="questionnaire-form">
      <transition name="slide-fade" mode="out-in">
        <keep-alive>
          <component
            :is="$store.state.activeTab"
            v-if="messagesLoaded"
          />
        </keep-alive>
      </transition>
    </form>
  </main>
</template>

<script>
import TabNav from '@/components/TabNav'
import LanguageToggle from '@/components/LanguageToggle'
import BusinessDetails from '@/components/BusinessDetails'
import ProductsServices from '@/components/ProductsServices'
import ExistingPresence from '@/components/ExistingPresence'
import YourAudience from '@/components/YourAudience'
import FinishQuestionnaire from '@/components/FinishQuestionnaire'

import { loadLanguageAsync } from '@/i18n'

export default {
  name: 'Questionnaire',
  components: {
    TabNav,
    LanguageToggle,
    'businessDetails': BusinessDetails,
    'productsServices': ProductsServices,
    'existingPresence': ExistingPresence,
    'yourAudience': YourAudience,
    'finishQuestionnaire': FinishQuestionnaire
  },
  created () {
    if (this.storageAvailable) { this.$store.dispatch('field/checkLocal') }

    loadLanguageAsync('en').then(lang => {
      this.messagesLoaded = lang
    })
  },
  data () {
    return {
      messagesLoaded: false
    }
  },
  computed: {
    storageAvailable () {
      try {
        let storage = window['localStorage']
        const x = '__storage_test__'
        storage.setItem(x, x)
        storage.removeItem(x)
        return true
      } catch (e) {
        return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          window['localStorage'].length !== 0
      }
    }
  }
}
</script>
