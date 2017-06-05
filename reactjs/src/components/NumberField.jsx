import React, { Component } from 'react'
import { formatValue } from '../utils'

class NumberField extends Component {
  state = {
    active: false,
    originalValue: null
  }

  componentWillMount () {
    this.handleChange({
      target: {
        name: this.props.label,
        value: this.props.value,
      }
    })
  }

  componentDidMount () {
     if (this.props.autofocus) {
        this.nameInput.focus()
     }
  }

  renderRefreshButton () {
    if (this.props.showRefresh) {
      return (
        <button
          onClick={this.handleRefreshField}
          tabIndex="100"
          className="number__field__refresh">
        </button>
      )
    }
  }

  toCamelCase (string) {
    return string
        .replace(/\s(.)/g, ($1) => $1.toUpperCase())
        .replace(/\s/g, '')
        .replace(/^(.)/, ($1) => $1.toLowerCase())
        .replace(/[\W_]+/g, '')
  }

  handleChange = (e) => {
    const name = this.toCamelCase(e.target.name)
    const value = e.target.value
    const formattedValue = formatValue(value, this.props.type)
    this.props.handleChange({name: name, value: formattedValue })
  }

  handleFocus = () => {
    this.setState({active: true, originalValue: this.props.value.toString()})
  }

  handleBlur = () => {
    if (this.props.triggerRefresh && this.state.originalValue !== null && this.state.originalValue !== this.props.value) {
      this.props.handleTriggerRefresh()
    }
    this.setState({active: false})
  }

  handleRefreshField = () => {
    const name = this.toCamelCase(this.props.label)
    this.props.handleRefreshField(name)
  }

  handleClick = () => {
    if (!this.props.disabled) {
      this.setState({active: true})
      setTimeout(() => {
        this.nameInput.focus()
      }, 0)
    }
  }

  render () {
    return (
      <div
        className={`number__field ${this.state.active ? 'active' : ''} ${this.props.disabled ? 'disabled' : ''}`}>
        <div
          onClick={this.handleClick}
          className={`number__field__container ${this.props.showRefresh ? 'refreshable' : ''}`}
        >
          <label className="number__field__label">{ this.props.label }</label>

          <input
            className={`number__field__input ${this.props.showRefresh ? 'refreshable' : ''}`}
            ref={(input) => { this.nameInput = input; }} 
            disabled={this.props.disabled}
            placeholder={this.props.placeholder}
            value={this.props.value}
            type="text"
            spellCheck="false"
            name={this.props.label}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />

          { this.renderRefreshButton() }
        </div>
      </div>
    )
  }
}

export default NumberField
