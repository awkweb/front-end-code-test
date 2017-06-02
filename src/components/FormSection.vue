<template>
  <section class="form-section">
    <span
      v-if="title"
      class="form-section__title">
      {{ title }}
    </span>
    
    <number-field
      v-for="field in fields"
      v-model.number="field.value"
      :key="field.label"
      :label="field.label"
      :placeholder="field.placeholder"
      :autofocus="field.autofocus"
      :refreshable="field.refreshable"
      @refreshField="refreshField">
    </number-field>

    <total-field
      v-if="total"
      :label="total.label"
      :value="total.value">
    </total-field>
  </section>
</template>

<script>
import NumberField from './NumberField.vue'
import TotalField from './TotalField.vue'

export default {
  name: 'form-section',

  components: {
    NumberField,
    TotalField
  },

  props: {
    title: String,
    fields: { type: Array, required: true },
    total: Object
  },

  methods: {
    onInput (value) {
      if (value === "") {
        value = 0
      }
      this.$emit('input', value)
    },

    refreshField () {
      this.showRefresh = false
      this.$emit('refreshField')    
    }
  }
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';
@import '../scss/_functions.scss';

.form-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;

  &__title {
    color: palette(black);
    font: {
      size: 1rem;
      weight: 600;
    }
    margin-bottom: .5rem;
  }
}
</style>
