import React, { Component } from 'react';

class NumberField extends Component {
  state = {
    backgroundColors: ['#C4DBEE', '#9ACAE0', '#63AED4']
  };

  getBarStyle (bar, index) {
    const percent = (bar.value / this.total) * 100
    const height = Math.max(percent, 1)
    return {
      backgroundColor: this.state.backgroundColors[index],
      height: `${height}%`,
      width: '100px'
    }
  };

  renderBar (bar, index) {
    if (bar.value > 0) {
      return (
        <div
          style={this.getBarStyle(bar, index)}
          className="chart__bar"
        >
          <span className="chart__bar__name">
            { bar.name }
          </span>
        </div>
      );
    }
  };

  renderBars () {
    let bars = []
    this.props.data.forEach((bar, index) => {
      const markup = this.renderBar(bar, index)
      if (markup) {
        bars.push(markup);
      }
    })
    return bars
  };

  render () {
    return (
      <div id="chart" className="chart">
        <div className="chart__container">
          <div className="chart__bars">
            { this.renderBars() }

            <div className="chart__y-label">
              <span className="chart__y-label__value">${ this.props.total } per month</span>
              <span className="chart__y-label__name">Retirement Income Goal</span>
            </div>
          </div>
        </div>

        <span className="chart__x-label">{ this.props.xLabel }</span>
      </div>
    );
  };
}

export default NumberField;
