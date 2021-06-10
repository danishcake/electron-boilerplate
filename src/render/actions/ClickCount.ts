import { RootState } from 'render/reducers';
import { actionCreator, AsyncActionCreator, Dispatch } from './Helpers';

/**
 * Increments the click count by the specified number
 */
export const IncrementClickCount = actionCreator<number>('INCREMENT_CLICK_COUNT');

/**
 * Increments the click count multiple times, sleeping between each increment
 * @param by The number of times to increase
 */
export const IncrementClickCountAsync = (by: number): AsyncActionCreator => {
  return async (dispatch: Dispatch, getState: () => RootState) => {

    for (let i = 0; i < by; i++) {
      await new Promise(resolve => setTimeout(resolve, 250));
      dispatch(IncrementClickCount(1));
    }
  };
};
