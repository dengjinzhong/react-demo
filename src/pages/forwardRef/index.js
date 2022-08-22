import React from 'react';
import Foo from './component/Foo';
import Bar from './component/Bar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.input = React.createRef(); // 1
    this.myRef = React.createRef(); // 1
    // ↑5
  }

  handleClick = (e) => {
    const input = this.input.current;
    // 6
    console.log(input);
    console.log(input.value);
    input.focus();
  }
  handleClick1 = (e) => {
    const instance = this.myRef.current;
    // 打印的是 Bar 实例
    console.log(instance);
  }

  render() {
    return (
      <>
        <button onClick={this.handleClick}>click to get value</button>
        <button onClick={this.handleClick1}>click to get instance</button>
        {/*2*/}
        <Foo ref={this.input}/>
        {/*挂载到组件上，因为Bar是一个class组件，所以只能挂载到其实例上*/}
        <Bar ref={this.myRef} />
      </>
    )
  }
}
