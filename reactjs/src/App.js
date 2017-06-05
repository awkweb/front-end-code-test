import React, { Component } from 'react';
import './App.css';

import FormSection from './components/FormSection'
import NumberField from './components/NumberField.jsx'
import TotalField from './components/TotalField.jsx'

class App extends Component {
  state = {
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
    animatedPersonalPentionTarget: 0
  };

  totalExistingIncome () {
    const existingIncomeSources = this.state.sections[1].fields
    const value = existingIncomeSources.reduce((previous, current) => {
      let previousValue = previous.value || previous
      previousValue = previousValue || 0
      const currentValue = current.value || 0
      return parseInt(previousValue) + parseInt(currentValue)
    })
    return { label: 'Total Existing Income', value: value }
  };

  retirementIncomeGap () {
    const retirementIncomeGoal = this.state.sections[0].fields[2].value
    const totalExistingIncome = this.totalExistingIncome().value
    return Math.max(retirementIncomeGoal - totalExistingIncome, 0)
  };

  personalPensionTarget () {
    return Math.round(this.retirementIncomeGap() * (this.state.portionToFill.value / 100))
  };

  renderForm () {
    const personalPensionTarget = this.personalPensionTarget()
    return (
      <form className="app__form">
        <FormSection
          title={this.state.sections[0].title}
          fields={this.state.sections[0].fields}
        >
        </FormSection>

        <FormSection
          title={this.state.sections[1].title}
          fields={this.state.sections[1].fields}
        >
        </FormSection>

        <section className="form-section">
          <span className="form-section__title">Pension Target</span>

          <TotalField
            label={'Retirement Income Gap'}
            value={this.state.retirementIncomeGap}
            grandTotal={false}
          >
          </TotalField>

          <NumberField
            label={this.state.portionToFill.label}
            placeholder={this.state.portionToFill.placeholder}
            type={this.state.portionToFill.type}
          >
          </NumberField>

          <TotalField
            label={'Personal Pension Target'}
            value={personalPensionTarget}
          >
          </TotalField>
        </section>
      </form>
    );
  };

  render () {
    return (
      <div className="app">
        { this.renderForm() }

        <div className="app__chart">
          <header className="app__chart__header">
            <h1 className="app__chart__title">Personal Pension Target</h1>
            <span className="app__chart__number">10,000</span>
            <span>per month</span>
          </header>
        </div>
      </div>
    );
  }
}

export default App;
