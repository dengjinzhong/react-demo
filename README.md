# 项目初始化
使用 Create React App 进行项目初始化
```shell
npx create-react-app react-demo
```
# 项目简化
为了项目简单，将 src 目录下只留 `App.js` 和 `index.js` 其他文件全部删除
```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

```javascript
// App.js
function App() {
  return (
    <div className="App">
      Hello World
    </div>
  );
}

export default App;
```

# React 组件的数据
React 组件大致分为两种，函数组件和 class 组件
React 组件的数据分为两种，prop 和 state ，无论 prop 或者 state 的改变，都可能引起组件的重新渲染
## 组件
定义组件最简单的方式就是编写 JavaScript 函数：
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
你同时还可以使用 ES6 的 class 来定义组件：
```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
## Prop
在 React 中，Prop 是从外部传递给组件的数据，一个 React 组件通过定义自己能够接受的 prop 就定义了自己的对外公共接口。
#### 赋值并读取 prop值
创建一个 Counter 组件如下：
```javascript
import React, { Component } from "react";

export default class Counter extends Component {
  render() {
    return (<div>
      {this.props.name} count: {this.props.initValue}
    </div>)
  }
}
```
创建父组件 ControlPanel 如下：
```javascript
import * as React from 'react';
import Counter from './Counter'

export class ControlPanel extends React.Component {
  render() {
    return (
      <div>
        <Counter caption={"first"} initValue={0} />
        <Counter caption={"Second"} initValue={10} />
        <Counter caption={"Third"} initValue={20} />
      </div>
    );
  };
};
```
在 APP 中使用后显示为：
```text
first count: 0
Second count: 10
Third count: 20
```
#### propTypes 检查
既然 prop 是组件的对外接口，那么就应该声明自己的接口规范，如 Counter 组件：
```javascript
import PropTypes from 'prop-types';

Counter.propTypes = {
  caption: PropTypes.string.isRequired,
  initValue: PropTypes.number
}
```
需要安装一个类型库
```shell
npm i prop-types -D
```
为了验证 propTypes 的作用， 故意将传入的 initValue 值写为字符串，浏览器可以正常渲染，但是在控制台中会有一段红色报错
```text
Warning: Failed prop type: Invalid prop `initValue` of type `string` supplied to `Counter`, expected `number`.
```
这些应该是只需要在开发环境中使用的， `babel-react-optimize` 就可以帮助实现这个功能

严格来说，React 并没有办法组织你去修改传入的 props 对象，**但是每个开发者应该严格遵守一个规定，就是不去修改**
#### defaultProps
因为有些 Prop 值是不必填的，我们可以通过 defaultProps 来传入默认值
```javascript
Counter.defaultProps = {
  initValue: 5
}
```
