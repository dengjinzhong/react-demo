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
# React 组件
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
## state
state 代表组件的内部状态，只要 class 组件才能有内部状态
#### 初始化 state
通常在组件类的构造函数结尾处初始化 state
```text
constructor(props) {
    super(props);
    this.state = {
      count: props.count
    }
}
```
#### 读取和更新 state
通过 `this.state` 可以读取到组件的当前 state，改变组件 state 必须要使用 `this.setState`， 而不能直接去修改 `this.state`
```javascript
export default class Counter extends Component {
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
    return (<div>
      <button onClick={this.onClickIncrementButton}>+</button>
      {this.props.caption} count: {this.state.count}
    </div>)
  }
}
```
1. 创建点击事件并使用 `this.setState` 方法修改内部状态 `count` 的值
2. 在构造函数中绑定 `this` 指向
3. 按钮绑定点击事件 `onClick={this.onClickIncrementButton}`

>> 直接修改 `this.state` 的值，虽然事实上改变了组件的内部状态，但只是野蛮地修改了 state ，却没有驱动组件进行重新渲染
## 组件向外传递数据
组件之间的交流是相互的，子组件某些情况下也需要把数据传递给父组件，解决这个问题的方法，依然是利用 prop

父组件构造一套数据，并声明一个方法来改变数据
```javascript
export class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.onCounterUpdate = this.onCounterUpdate.bind(this)
    this.state = {
      count: {
        first: 0,
        Second: 10,
        Third: 20
      }
    }
  }
  onCounterUpdate(newValue, caption) {
    const count = this.state.count
    this.setState({
      count: {
        ...count,
        [caption]: newValue
      }
    })
  }
  render() {
    const { first, Second, Third } = this.state.count
    return (
      <div>
        <Counter caption={"first"} initValue={first} onUpdate={this.onCounterUpdate} />
        <Counter caption={"Second"} initValue={Second} onUpdate={this.onCounterUpdate} />
        <Counter caption={"Third"} initValue={Third} onUpdate={this.onCounterUpdate} />
        <div>
          <ul>
            <li>first: { first }</li>
            <li>Second: { Second }</li>
            <li>Third: { Third }</li>
          </ul>
        </div>
      </div>
    );
  };
};
```
子组件点击 + 按钮时同时触发父组件传递方法
```javascript
export default class Counter extends Component {
  // ...
  onClickIncrementButton() {
    this.updateCount(this.state.count + 1)
  }
  updateCount(newValue) {
    this.setState({ count: newValue })
    this.props.onUpdate(newValue, this.props.caption)
  }
  // ...
}
```
## 组件的生命周期
React 严格定义了组件的生命周期，生命周期可能会经历如下三个过程：
* 装载过程（Mount），也就是把组件第一次在 DOM 树中渲染的过程；
* 更新过程（Update），当组件被重新渲染的过程；
* 卸载过程（Unmount），组件从 DOM 中删除的过程。

#### 装载过程（Mount）
当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：
* constructor: 构造函数 1. 初始化 state 2. 绑定成员函数的 this 环境
* ~~getInitialState~~: 只在 React.createClass 方法创建的组件类才会用到，初始化 state（已废弃）
* ~~getDefaultProps~~: 只在 React.createClass 方法创建的组件类才会用到，返回 props 初始值（已废弃）
* ~~componentWillMount~~: render 函数调用之前被调用，即 “将要装载”（已废弃）
* static getDerivedStateFromProps: 它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。（新增）
* render: 返回 DOM 渲染结构
* componentDidMount: 组件已经被 “装载” 到了 DOM 树上了
>需要注意，render 函数应该是一个纯函数，完全根据 this.state 和 this.props 来决定返回的结果，而且不要产生任何副作用

在 Counter 组件中对应的生命周期进行打印，发现：
```text
Counter.js:11 first--constructor--
Counter.js:24 first--render--
Counter.js:11 Second--constructor--
Counter.js:24 Second--render--
Counter.js:11 Third--constructor--
Counter.js:24 Third--render--
Counter.js:20 first--componentDidMount--
Counter.js:20 Second--componentDidMount--
Counter.js:20 Third--componentDidMount--
```
由结果可知组件的 constructor 和 render 会依次执行，最后会合并所有 render 返回的结构处理进行依次装载
#### 更新过程（Update）
当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：
* ~~componentWillReceiveProps~~: 已弃用
* static getDerivedStateFromProps: 它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。（新增）
* shouldComponentUpdate: 根据 shouldComponentUpdate() 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。
* ~~componentWillUpdate~~:
* render: 返回 DOM 渲染结构
* componentDidUpdate: 会在更新后会被立即调用。首次渲染不会执行此方法。
#### 卸载过程（Unmount）
当组件从 DOM 中移除时会调用如下方法：
* componentWillUnmount: 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作

#### render
当我们点击 first + 按钮时同时触发其它三个组件的 render 函数，这是因为父组件的更新会触发所有子组件的 render 函数， 这显然不太符合我们预期
1. shouldComponentUpdate
要让结果符合我们预期，即只有 first 组件更新，其余组件不更新，就需要用到 shouldComponentUpdate 函数了
```text
shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (nextProps.caption !== this.props.caption) || (nextProps.initValue !== this.props.initValue) || (nextState.count !== this.state.count)
}
```
现在我们点击first + 按钮就会发现只触发了 first 组件更新
2. PureComponent
React.PureComponent 与 React.Component 很相似。两者的区别在于 React.Component 并未实现 shouldComponentUpdate()，而 React.PureComponent 中以浅层对比 prop 和 state 的方式来实现了该函数。

如果赋予 React 组件相同的 props 和 state，render() 函数会渲染相同的内容，那么在某些情况下使用 React.PureComponent 可提高性能。
```javascript
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
```
3. React.memo
React.memo 为高阶组件。该方式只适用于函数组件。

如果你的组件在相同 props 的情况下渲染相同的结果，那么你可以通过将其包装在 React.memo 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

```javascript
export const CounterMemo = React.memo(function MyComponent(props) {
  console.log(`${props.caption}--render--`, { props })
  /* 使用 props 渲染 */
  return (<div>
    {props.caption} count: {props.initValue}
  </div>)
});
```




