import React from 'react';

export default class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '这是class组件, ref 只能挂载到实例上'
    };
  }

  componentDidMount() {
    console.log(this);
  }
  render() {
    return (
      <div>
        class 组件
      </div>
    );
  }
}
