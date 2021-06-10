import React, { useState } from 'react'

/**
 * Props passed to this component
 */
export interface Props {
  clickCount: number;
  onClick: () => void;
  onAsyncClick: () => void;
}

export const ClickCounterComponent: React.FunctionComponent<Props> = (props: Props) => {
  return (<>
      <div>All buttons have been clicked {props.clickCount} times</div>
      <button onClick={props.onClick}>+1</button>
      <button onClick={props.onAsyncClick}>+5 async</button>
    </>);
};
