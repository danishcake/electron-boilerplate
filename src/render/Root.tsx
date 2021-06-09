import * as React from 'react';
import { hot } from 'react-hot-loader/root';

export interface OwnProps {
  suffix: string;
}

const Child: React.FunctionComponent<OwnProps> = (props: OwnProps) => {
  return (
    <div>Hello world {props.suffix}</div>
  );
};

const Root: React.FunctionComponent = () => {
  return (
    <div>
      <Child suffix='3'/>
      <Child suffix='2'/>
    </div>
  );
};

export default hot(Root);
