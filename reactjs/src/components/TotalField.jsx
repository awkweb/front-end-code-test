import React, { Component } from 'react';
import { formatValue } from '../utils'

class NumberField extends Component {
  render () {
    return (
      <div className="total__field">
        <label className={`total__field__label ${this.props.grandTotal ? 'grand' : ''}`}>
          { this.props.label }
        </label>
        
        <span className={`total__field__value ${this.props.grandTotal ? 'grand' : ''}`}>
          ${formatValue(this.props.value)}
        </span>
      </div>
    );
  };
}

export default NumberField;
