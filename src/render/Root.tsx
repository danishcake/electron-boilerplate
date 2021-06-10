import * as React from 'react';
import { hot } from 'react-hot-loader/root';

export interface OwnProps {
  suffix: string;
}

const Child: React.FunctionComponent<OwnProps> = (props: OwnProps) => {
  const [count, setCount] = React.useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>Button #{props.suffix} has been clicked {count} times</button>
  );
};

const Root: React.FunctionComponent = () => {
  return (
    <div>
      <Child suffix='1'/>
      <Child suffix='2'/>
    </div>
  );
};

export default hot(Root);
