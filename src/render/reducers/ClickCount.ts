import { IncrementClickCount } from '../actions/ClickCount';
import { Action } from '../actions/Helpers';

/**
 * The state of this reducer
 */
export interface State {
  clickCount: number;
}

/**
 * The intial values to populate this reducer with
 */
const INITIAL_STATE: Readonly<State> = {
  clickCount: 0
};

export function clickCountReducer(state: Readonly<State> = INITIAL_STATE, action: Action): State {
  if (IncrementClickCount.test(action)) {
    return {
      ...state,
      clickCount: state.clickCount + action.payload
    };
  }

  return state;
}
