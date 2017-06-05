import React, { Component } from 'react'
import { formatValue, toNumber } from './utils'
import './App.css'

import FormSection from './components/FormSection'
import NumberField from './components/NumberField.jsx'
import TotalField from './components/TotalField.jsx'
import Chart from './components/Chart.jsx'

class App extends Component {
  state = {
    retirementAge: { label: 'Retirement Age', value: 70, placeholder: '70', autofocus: true, triggerRefresh: true },
    spouseRetirementAge: { label: 'Spouse Retirement Age', value: 71, placeholder: '71', disabled: true },
    retirementIncomeGoal: { label: 'Retirement Income Goal', value: 28000, placeholder: '28000', refreshable: true, showRefresh: false, type: 'currency' },
    socialSecurity: { label: 'Social Security', value: 9000, placeholder: '9000', refreshable: true, showRefresh: false, type: 'currency' },
    spouseSocialSecurity: { label: 'Spouse Social Security', value: 9000, placeholder: '9000', refreshable: true, showRefresh: false, type: 'currency' },
    otherIncomeSources: { label: 'Other Income Source(s)', value: 0, placeholder: '0', type: 'currency' },
    portionToFill: { label: 'Portion To Fill', value: 100, placeholder: '100%', type: 'percent' }
  }

  totalExistingIncome (existingIncomeSources) {
    const value = existingIncomeSources.reduce((previous, current) => {
      let previousValue = previous.value || previous
      previousValue = previousValue || 0
      const currentValue = current.value || 0
      return toNumber(previousValue) + toNumber(currentValue)
    })
    return { label: 'Total Existing Income', value: value }
  }

  retirementIncomeGap (retirementIncomeGoal, totalExistingIncome) {
    return Math.max(toNumber(retirementIncomeGoal) - totalExistingIncome, 0)
  }

  personalPensionTarget (retirementIncomeGap) {
    return Math.round(retirementIncomeGap * (toNumber(this.state.portionToFill.value) / 100))
  }

  handleChange (target) {
    let field = this.state[target.name]
    field.value = target.value
    this.setState({[target.name]: field})
  }

  handleTriggerRefresh () {
    Object.keys(this.state).forEach((key) => {
      let field = this.state[key]
      if (field.refreshable) {
        field.showRefresh = true
        this.setState({[key]: field})
      }
    })
  }

  handleRefreshField (name) {
    let field = this.state[name]
    const rangeMax = 2000
    const randomAmount = Math.floor(Math.random() * (rangeMax + rangeMax + 1)) - rangeMax
    field.value = formatValue(Math.max(toNumber(field.value) + randomAmount, 0), field.type)
    field.showRefresh = false
    this.setState({[name]: field})
  }

  renderForm (sections, retirementIncomeGap, personalPensionTarget) {
    return (
      <form className="app__form">
        {
          sections.map((section) =>
            <FormSection
              key={section.title}
              title={section.title}
              fields={section.fields}
              total={section.total}
              handleChange={this.handleChange.bind(this)}
              handleTriggerRefresh={this.handleTriggerRefresh.bind(this)}
              handleRefreshField={this.handleRefreshField.bind(this)}
            >
            </FormSection>
          ) 
        }

        <section className="form-section">
          <span className="form-section__title">Pension Target</span>

          <TotalField
            label={'Retirement Income Gap'}
            value={retirementIncomeGap}
            grandTotal={false}
          >
          </TotalField>

          <NumberField
            label={this.state.portionToFill.label}
            value={this.state.portionToFill.value}
            placeholder={this.state.portionToFill.placeholder}
            type={this.state.portionToFill.type}
            handleChange={this.handleChange.bind(this)}
          >
          </NumberField>

          <TotalField
            label={'Personal Pension Target'}
            value={personalPensionTarget}
            grandTotal={true}
          >
          </TotalField>
        </section>
      </form>
    )
  }

  render () {
    const existingIncomeSources = [this.state.socialSecurity, this.state.spouseSocialSecurity, this.state.otherIncomeSources]
    const totalExistingIncome = this.totalExistingIncome(existingIncomeSources)
    const retirementIncomeGap = this.retirementIncomeGap(this.state.retirementIncomeGoal.value, totalExistingIncome.value)
    const personalPensionTarget = this.personalPensionTarget(retirementIncomeGap)
    const sections = [
      {
        title: 'General Information',
        fields: [this.state.retirementAge, this.state.spouseRetirementAge, this.state.retirementIncomeGoal]
      },
      {
        title: 'Existing Income Sources',
        fields: existingIncomeSources,
        total: totalExistingIncome
      }
    ]
    const chartData = {
      total: toNumber(this.state.retirementIncomeGoal.value),
      xLabel: `Age ${this.state.retirementAge.value}`,
      bars:[
        { name: 'Retirement Income Gap', value: toNumber(this.state.portionToFill.value) < 100 ? retirementIncomeGap : 0, order: 1 },
        { name: 'Personal Pension Target', value: personalPensionTarget, order: 2 },
        { name: 'Total Existing Income', value: totalExistingIncome.value, order: 3 }
      ]
    }

    return (
      <div className="app">
        {this.renderForm(sections, retirementIncomeGap, personalPensionTarget)}

        <div className="app__chart">
          <header className="app__chart__header">
            <h1 className="app__chart__title">Personal Pension Target</h1>
            <span className="app__chart__number">{formatValue(personalPensionTarget)}</span>
            <span>per month</span>
          </header>

          <Chart
            total={chartData.total}
            data={chartData.bars}
            xLabel={chartData.xLabel}
          >
          </Chart>
        </div>
      </div>
    )
  }
}

export default App
