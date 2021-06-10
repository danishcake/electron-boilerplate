import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { ClickCounterContainer } from './components/ClickCounter/ClickCounterContainer';

const Root: React.FunctionComponent = () => {
  return (
    <div>
      <ClickCounterContainer/>
    </div>
  );
};

export default hot(Root);
