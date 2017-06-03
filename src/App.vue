<template>
  <div id="app" class="app">
    <form class="app__form">
      <form-section
        :title="sections[0].title"
        :fields="sections[0].fields"
        @onTriggerRefresh="onTriggerRefresh"
        @onRefreshField="onRefreshField"
      >
      </form-section>

      <form-section
        :title="sections[1].title"
        :fields="sections[1].fields"
        :total="totalExistingIncome"
        @onRefreshField="onRefreshField"
      >
      </form-section>

      <section class="form-section">
        <span class="form-section__title">Pension Target</span>
        
        <total-field
          :label="'Retirement Income Gap'"
          :value="retirementIncomeGap">
        </total-field>

        <number-field
          v-model.number="portionToFill.value"
          :label="portionToFill.label"
          :placeholder="portionToFill.placeholder"
          :type="portionToFill.type"
        >
        </number-field>
      </section>
    </form>

    <div class="app__chart">
      <header class="app__chart__header">
        <h1 class="app__chart__title">Personal Pension Target</h1>
        <span class="app__chart__number">${{ personalPensionTarget | prettyNumber }}</span>
      </header>
    </div>
  </div>
</template>

<script>
import FormSection from './components/FormSection.vue'
import TotalField from './components/TotalField.vue'
import NumberField from './components/NumberField.vue'

export default {
  name: 'app',

  data: () => ({
    sections: [
      {
        title: 'General Information',
        fields: [
          { label: 'Retirement Age', value: 70, placeholder: '70', autofocus: true, triggerRefresh: true },
          { label: 'Spouse Retirement Age', value: 71, placeholder: '71', disabled: true },
          { label: 'Retirement Income Goal', value: 28000, placeholder: '28000', refreshable: true, showRefresh: false, type: 'currency' }
        ]
      },
      {
        title: 'Existing Income Sources',
        fields: [
          { label: 'Social Security', value: 9000, placeholder: '9000', refreshable: true, showRefresh: false, type: 'currency' },
          { label: 'Spouse Social Security', value: 9000, placeholder: '9000', refreshable: true, showRefresh: false, type: 'currency' },
          { label: 'Other Income Source(s)', value: 0, placeholder: '0', type: 'currency' }
        ]
      }
    ],
    portionToFill: { label: 'Portion To Fill', value: 100, placeholder: '100%', type: 'percent' },
  }),

  components: {
    FormSection,
    TotalField,
    NumberField
  },

  computed: {
    totalExistingIncome () {
      const existingIncomeSources = this.sections[1].fields
      const value = existingIncomeSources.reduce((previous, current) => {
        let previousValue = previous.value || previous
        previousValue = previousValue || 0
        const currentValue = current.value || 0
        return parseInt(previousValue) + currentValue
      })
      return { label: 'Total Existing Income', value: value }
    },
    retirementIncomeGap () {
      const retirementIncomeGoal = this.sections[0].fields[2].value
      return retirementIncomeGoal - this.totalExistingIncome.value
    },
    personalPensionTarget () {
      return this.retirementIncomeGap * (this.portionToFill.value / 100)
    }
  },

  methods: {
    onTriggerRefresh () {
      this.sections.forEach((section) => {
        section.fields.forEach((field) => {
          if (field.refreshable) {
            field.showRefresh = true
          }
        })
      })
    },

    onRefreshField (data) {
      const sectionIndex = this.sections.findIndex(section => section.title === data.sectionTitle)
      const section = this.sections[sectionIndex]
      const fieldIndex = section.fields.findIndex(field => field.label === data.fieldLabel)
      const randomAmount = Math.floor(Math.random() * (2000 - -2000 + 1)) + -2000;
      this.sections[sectionIndex].fields[fieldIndex].showRefresh = false
      this.sections[sectionIndex].fields[fieldIndex].value += randomAmount
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
  min-height: 100vh;

  @media screen and (max-width: screen(large)) {
    flex-direction: column;
  }

  &__form, &__chart {
    flex: 1;
    padding: 2rem;
  }
}

.app__chart {
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
  }

  &__number {
    color: palette(blue);
    font: {
      size: 4rem;
      weight: 400;
    }
    letter-spacing: 3px;
  }
}
</style>
