import * as React from 'react';
import Counter from './Counter'
import { CounterPure, CounterCom, CounterMemo } from './CounterPure'

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
    console.log('ControlPanel--render--')
    const { first, Second, Third } = this.state.count
    return (
      <div>
        <Counter caption={"first"} initValue={first} onUpdate={this.onCounterUpdate} />
        <Counter caption={"Second"} initValue={Second} onUpdate={this.onCounterUpdate} />
        <Counter caption={"Third"} initValue={Third} onUpdate={this.onCounterUpdate} />
        <CounterCom caption={"Component"} initValue={10} />
        <CounterPure caption={"Pure"} initValue={10} />
        <CounterMemo caption={"Memo"} initValue={10} />
        <div>
          <ul>
            <li>
              <button onClick={() => { this.onCounterUpdate(first + 1, 'first') }}>+</button>
              first: { first }
            </li>
            <li>
              <button onClick={() => { this.onCounterUpdate(Second + 1, 'Second') }}>+</button>
              Second: { Second }
            </li>
            <li>
              <button onClick={() => { this.onCounterUpdate(Third + 1, 'Third') }}>+</button>
              Third: { Third }
            </li>
          </ul>
        </div>
      </div>
    );
  };
};
