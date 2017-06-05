import React, { Component } from 'react';

class NumberField extends Component {
  state = {
    active: false,
    originalValue: null
  };

  renderRefreshButton () {
    if (this.props.showRefresh) {
      return (
        <button
          tabIndex="100"
          className="number__field__refresh">
        </button>
      );
    }
  };

  render () {
    return (
      <div className={`number__field ${this.props.active ? 'active' : ''} ${this.props.disabled ? 'disabled' : ''}`}>
        <div className={`number__field__container ${this.props.showRefresh ? 'refreshable' : ''}`}>
          <label className="number__field__label">{ this.props.label }</label>

          <input
            className={`number__field__input ${this.props.showRefresh ? 'refreshable' : ''}`}
            ref="input"
            disabled={this.props.disabled}
            placeholder={this.props.placeholder}
            value={this.props.value}
            type="text"
            spellCheck="false"
          />

          { this.renderRefreshButton() }
        </div>
      </div>
    );
  }
}

export default NumberField;
