import React, { Component } from "react";
import PropTypes from 'prop-types';

export default class Counter extends Component {
  render() {
    return (<div>
      {this.props.caption} count: {this.props.initValue}
    </div>)
  }
}

Counter.propTypes = {
  caption: PropTypes.string.isRequired,
  initValue: PropTypes.number
}

Counter.defaultProps = {
  initValue: 5
}
