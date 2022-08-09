import * as React from 'react';
import Counter from './Counter'

export class ControlPanel extends React.Component {
  render() {
    return (
      <div>
        <Counter caption={"first"} />
        <Counter caption={"Second"} initValue={10} />
        <Counter caption={"Third"} initValue={20} />
      </div>
    );
  };
};
