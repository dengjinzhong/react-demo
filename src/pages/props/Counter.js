import React, { Component } from "react";
import PropTypes from 'prop-types';

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.onClickIncrementButton = this.onClickIncrementButton.bind(this)
    this.state = {
      count: props.initValue
    }
    console.log(`${this.props.caption}--constructor--`)
  }
  onClickIncrementButton() {
    this.updateCount(this.state.count + 1)
  }
  updateCount(newValue) {
    this.setState({ count: newValue })
    this.props.onUpdate(newValue, this.props.caption)
  }
  render() {
    console.log(`${this.props.caption}--render--`, { props: this.props, state: this.state })
    return (<div>
      <button onClick={this.onClickIncrementButton}>+</button>
      {this.props.caption} count: {this.state.count}
    </div>)
  }
}

Counter.propTypes = {
  caption: PropTypes.string.isRequired,
  initValue: PropTypes.number,
  onUpdate: PropTypes.func
}

Counter.defaultProps = {
  initValue: 5,
  onUpdate: () => {}
}
