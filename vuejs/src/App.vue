<template>
  <div id="app" class="app">
    <form 
      @submit.prevent
      class="app__form"
    >
      <form-section
        :title="'General Information'"
        :fields="[fields.retirementAge, fields.spouseRetirementAge, fields.retirementIncomeGoal]"
        @onTriggerRefresh="onTriggerRefresh"
        @onRefreshField="onRefreshField"
      >
      </form-section>

      <form-section
        :title="'Existing Income Sources'"
        :fields="[fields.socialSecurity, fields.spouseSocialSecurity, fields.otherIncomeSources]"
        :total="totalExistingIncome"
        @onRefreshField="onRefreshField"
      >
      </form-section>

      <section class="form-section">
        <span class="form-section__title">Pension Target</span>

        <total-field
          :label="'Retirement Income Gap'"
          :value="retirementIncomeGap"
          :grandTotal="false"
        >
        </total-field>

        <number-field
          v-model="fields.portionToFill.value"
          :label="fields.portionToFill.label"
          :placeholder="fields.portionToFill.placeholder"
          :type="fields.portionToFill.type"
        >
        </number-field>

        <total-field
          :label="'Personal Pension Target'"
          :value="personalPensionTarget"
        >
        </total-field>
      </section>
    </form>

    <div class="app__chart">
      <header class="app__chart__header">
        <h1 class="app__chart__title">Personal Pension Target</h1>
        <span class="app__chart__number">{{ (animatedPersonalPentionTarget == 0 ? personalPensionTarget : animatedPersonalPentionTarget) | prettyNumber }}</span>
        <span>per month</span>
      </header>

      <chart
        :total="chartData.total"
        :data="chartData.bars"
        :xLabel="chartData.xLabel"
      >
      </chart>
    </div>
  </div>
</template>

<script>
import TWEEN from 'tween.js'
import { formatMixin } from './mixins'
import FormSection from './components/FormSection.vue'
import TotalField from './components/TotalField.vue'
import NumberField from './components/NumberField.vue'
import Chart from './components/Chart.vue'

export default {
  name: 'app',

  data: () => ({
    fields: {
      retirementAge: { label: 'Retirement Age', value: 70, placeholder: '70', autofocus: true, triggerRefresh: true },
      spouseRetirementAge: { label: 'Spouse Retirement Age', value: 71, placeholder: '71', disabled: true },
      retirementIncomeGoal: { label: 'Retirement Income Goal', value: 28000, placeholder: '28000', refreshable: true, showRefresh: false, type: 'currency' },
      socialSecurity: { label: 'Social Security', value: 9000, placeholder: '9000', refreshable: true, showRefresh: false, type: 'currency' },
      spouseSocialSecurity: { label: 'Spouse Social Security', value: 9000, placeholder: '9000', refreshable: true, showRefresh: false, type: 'currency' },
      otherIncomeSources: { label: 'Other Income Source(s)', value: 0, placeholder: '0', type: 'currency' },
      portionToFill: { label: 'Portion To Fill', value: 100, placeholder: '100%', type: 'percent' }
    },
    animatedPersonalPentionTarget: 0
  }),

  mixins: [
    formatMixin
  ],

  components: {
    FormSection,
    TotalField,
    NumberField,
    Chart
  },

  computed: {
    totalExistingIncome () {
      const existingIncomeSources = [
        this.toNumber(this.fields.socialSecurity.value),
        this.toNumber(this.fields.spouseSocialSecurity.value),
        this.toNumber(this.fields.otherIncomeSources.value)
      ]
      const value = existingIncomeSources.reduce((previous, current) => previous + current)
      return { label: 'Total Existing Income', value: value }
    },
    
    retirementIncomeGap () {
      const retirementIncomeGoal = this.toNumber(this.fields.retirementIncomeGoal.value)
      return Math.max(retirementIncomeGoal - this.totalExistingIncome.value, 0)
    },

    personalPensionTarget () {
      const portionToFill = this.toNumber(this.fields.portionToFill.value)
      return Math.round(this.retirementIncomeGap * (portionToFill / 100))
    },

    chartData () {
      const retirementIncomeGoal = this.toNumber(this.fields.retirementIncomeGoal.value)
      const retirementAge = this.toNumber(this.fields.retirementAge.value)
      const portionToFill = this.toNumber(this.fields.portionToFill.value)
      const retirementIncomeGap = portionToFill < 100 ? this.retirementIncomeGap : 0
      return {
        total: this.toNumber(retirementIncomeGoal),
        xLabel: `Age ${retirementAge}`,
        bars:[
          { name: 'Retirement Income Gap', value: retirementIncomeGap, order: 1 },
          { name: 'Personal Pension Target', value: this.personalPensionTarget, order: 2 },
          { name: 'Total Existing Income', value: this.totalExistingIncome.value, order: 3 }
        ]
      }
    }
  },

  watch: {
    personalPensionTarget (newValue, oldValue) {
      let vm = this
      let animationFrame
      const animate = (time) => {
        TWEEN.update(time)
        animationFrame = requestAnimationFrame(animate)
      }
      new TWEEN.Tween({ tweeningNumber: oldValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: newValue }, 500)
        .onUpdate(function () {
          vm.animatedPersonalPentionTarget = this.tweeningNumber.toFixed(0)
        })
        .onComplete(() => cancelAnimationFrame(animationFrame))
        .start()
      animationFrame = requestAnimationFrame(animate)
    }
  },

  methods: {
    onTriggerRefresh () {
      Object.keys(this.fields).forEach((key) => {
        let field = this.fields[key]
        if (field.refreshable) {
          this.fields[key].showRefresh = true
        }
      })
    },

    onRefreshField (fieldKey) {
      const rangeMax = 2000
      const randomAmount = Math.floor(Math.random() * (rangeMax + rangeMax + 1)) - rangeMax
      const field = this.fields[fieldKey]
      const newValue = Math.max(this.toNumber(field.value) + randomAmount, 0)
      this.fields[fieldKey].showRefresh = false
      this.fields[fieldKey].value = this.formatValue(newValue, field.type)
    },

    toNumber (value) {
      return parseInt(value.toString().replace(/(^0{2,})|([^0-9]+)/g, ''))
    }
  }
}
</script>

<style lang="scss">
@import './scss/_variables.scss';
@import './scss/_functions.scss';

html {
  font: {
    family: $sans-serif;
    size: 20px;
  }
}

body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.app {
  color: palette(black);
  display: flex;
  padding: {
    left: 1rem;
    right: 1rem;
  }

  @media screen and (max-width: screen(large)) {
    flex-direction: column;
  }
}

.app__form {
  flex: 1;
  padding: 2rem;

  @media screen and (max-width: screen(larger)) {
    padding: {
      left: 0;
      right: 0;
    }
  }

  @media screen and (max-width: screen(large)) {
    padding: {
      bottom: .5rem;
      left: 0;
      right: 0;
      top: 1rem;
    }
  }
}

.app__chart {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 2rem;

  @media screen and (max-width: screen(large)) {
    padding: {
      bottom: .5rem;
      left: 0;
      right: 0;
      top: .5rem;
    }
  }

  &__header {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  &__title {
    font: {
      size: 1rem;
      weight: 600;
    }
    margin: {
      top: 0;
      bottom: 1.5rem;
    }

    @media screen and (max-width: screen(medium)) {
      font-size: .9rem;
    }
  }

  &__number {
    color: palette(blue);
    font: {
      size: 4rem;
      weight: 300;
    }
    position: relative;

    @media screen and (max-width: screen(medium)) {
      font-size: 3rem;
    }

    &:before {
      color: palette(blue, light);
      content: "$";
      font-size: 2rem;
      position: absolute;
      left: -1.5rem;
      top: 1rem;

      @media screen and (max-width: screen(medium)) {
        font-size: 1.6rem;
        top: .75rem;
      }
    }
  }
}
</style>
