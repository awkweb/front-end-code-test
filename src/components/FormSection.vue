<template>
  <section class="form-section">
    <span
      v-if="title"
      class="form-section__title">
      {{ title }}
    </span>
    
    <number-field
      v-for="field in fields"
      v-model="field.value"
      :key="field.label"
      :label="field.label"
      :autofocus="field.autofocus"
      :disabled="field.disabled"
      :placeholder="field.placeholder"
      :refreshable="field.refreshable"
      :showRefresh="field.showRefresh"
      :triggerRefresh="field.triggerRefresh"
      :type="field.type"
      @onRefreshField="onRefreshField"
      @onTriggerRefresh="onTriggerRefresh"
    >
    </number-field>

    <total-field
      v-if="total"
      :label="total.label"
      :value="total.value"
    >
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
      this.$emit('input', value)
    },

    onTriggerRefresh () {
      this.$emit('onTriggerRefresh')
    },

    onRefreshField (label) {
      const data = { sectionTitle: this.title, fieldLabel: label }
      this.$emit('onRefreshField', data)    
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
