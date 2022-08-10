import * as React from 'react';
export class CounterCom extends React.Component {
  constructor(props) {
    super(props);
    this.onClickIncrementButton = this.onClickIncrementButton.bind(this)
    this.state = {
      count: props.initValue
    }
  }
  onClickIncrementButton() {
    this.setState({
      count: this.state.count + 1
    })
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (nextProps.caption !== this.props.caption) || (nextProps.initValue !== this.props.initValue) || (nextState.count !== this.state.count)
  }
  componentDidMount() {
    console.log(`${this.props.caption}--componentDidMount--`)
  }
  render() {
    console.log(`${this.props.caption}--render--`, { props: this.props, state: this.state })
    return (<div>
      <button onClick={this.onClickIncrementButton}>+</button>
      {this.props.caption} count: {this.state.count}
    </div>)
  }
};

export class CounterPure extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onClickIncrementButton = this.onClickIncrementButton.bind(this)
    this.state = {
      count: props.initValue
    }
  }
  onClickIncrementButton() {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    console.log(`${this.props.caption}--render--`, { props: this.props, state: this.state })
    return (<div>
      <button onClick={this.onClickIncrementButton}>+</button>
      {this.props.caption} count: {this.state.count}
    </div>)
  }
};

export const CounterMemo = React.memo(function MyComponent(props) {
  console.log(`${props.caption}--render--`, { props })
  /* 使用 props 渲染 */
  return (<div>
    {props.caption} count: {props.initValue}
  </div>)
});
