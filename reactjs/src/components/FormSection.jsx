import React, { Component } from 'react';

import NumberField from './NumberField.jsx'
import TotalField from './TotalField.jsx'

class FormSection extends Component {
  renderFields () {
    return this.props.fields.map((field) =>
      <NumberField
        key={field.label}
        label={field.label}
        autofocus={field.autofocus}
        disabled={field.disabled}
        placeholder={field.placeholder}
        refreshable={field.refreshable}
        showRefresh={field.showRefresh}
        triggerRefresh={field.triggerRefresh}
        type={field.type}
      >
      </NumberField>
    );
  };

  renderTotal () {
    if (this.props.total) {
      return (
        <TotalField
          label={this.props.total.label}
          value={this.props.total.value}
        >
        </TotalField>
      );
    }
  };

  render () {
    return (
      <section className="form-section">
        <span
          className="form-section__title">
          { this.props.title }
        </span>

        { this.renderFields() }
        { this.renderTotal() }
      </section>
    );
  }
}

export default FormSection;
