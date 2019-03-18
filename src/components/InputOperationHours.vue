<template>
  <div class="form-field__operation-hours lg">
    <InputText
      v-for="day of week"
      :section="section"
      :handle="day"
      :key="day"
      :enableCopy="true"
      @copyToAll="copyToAll($event, day)"
    />
  </div>
</template>

<script>
import InputText from '@/components/InputText'

export default {
  name: 'InputOperationHours',
  props: {
    section: { type: String, required: true }
  },
  components: {
    InputText
  },
  data () {
    return {
      week: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
      ]
    }
  },
  methods: {
    copyToAll (value, day) {
      this.$store.dispatch('field/copyToAll', {
        section: this.section,
        value,
        recipients: this.week
      })
    }
  }
}
</script>
