import React from 'react';
import { useHistory } from 'react-router-dom';
import { ClickCounterContainer } from '../components/ClickCounter/ClickCounterContainer';

/**
 * Count page. Displays a header and a click counter
 */
export const CountPage: React.FunctionComponent = () => {
  const history = useHistory();

  return (
    <>
      <h1>Click counter</h1>
      <ClickCounterContainer />
      <button type='button' onClick={() => history.goBack()}>
        Home
      </button>
    </>
  );
};
