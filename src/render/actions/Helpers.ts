import { Action as ReduxAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from 'render/reducers';

// TBD: This could be replaced with any for less typing, or an enum for more
export type ActionType = string;

/**
 * An action without a payload
 */
export type Action = ReduxAction<ActionType>;

/**
 * An action with a payload of type T
 */
export interface ActionWithPayload<T> extends Action {
  readonly payload: T;
}

/**
 * An action creator for an Action without a payload
 */
interface ActionCreatorVoid {
  // The type of action created by this ActionCreator
  readonly type: ActionType;

  // Creates the action
  (): Action;

  // Tests if an action was created by this ActionCreator
  test(action: Action): boolean;
}

/**
 * An action creator for an Action with payload of type T
 */
interface ActionCreator<T> {
  // The type of action created by this ActionCreator
  readonly type: ActionType;

  // Creates the action
  (payload: T): ActionWithPayload<T>;

  // Tests if an action was created by this ActionCreator
  test(action: Action): action is ActionWithPayload<T>;
}

/**
 * Helper to create ActionCreatorVoid objects. Note that there isn't particularly nice
 * syntax for declaring functors in Javascript.
 * @param type The type of action
 * @returns An ActionCreatorVoid, that when called, returns Actions of specified type
 *
 * @example
 * // Create the action creator
 * const TaskStart: ActionCreatorVoid = actionCreatorVoid('TASK_START');
 *
 * // Use it to make an action
 * const taskStartAction = TaskStart();
 *
 * // Later, in a reducer, test an incoming action
 * if (TaskStart.test(action)) {
 *   // Handle the action
 * }
 */
export const actionCreatorVoid = (type: ActionType): ActionCreatorVoid => {
  return Object.assign(() => ({ type }), {
    type,
    test(action: Action): boolean {
      return action.type === type;
    }
  });
};

/**
 * Helper to create ActionCreator<T> objects. Note that there isn't particularly nice
 * syntax for declaring functors in Javascript.
 * @param type The type of action
 * @returns An ActionCreator<T>, that when called, returns Actions of specified type
 *
 * @example
 * // Create the action creator
 * const TaskError: ActionCreator = actionCreator<{error: string}>('TASK_ERROR');
 *
 * // Use it to make an action
 * const taskErrorAction = TaskError({error: 'On fire'});
 *
 * // Later, in a reducer, test an incoming action
 * if (TaskError.test(action)) {
 *   // Handle the action. Type of action will be narrowed to Action<T>, so we can easily use error
 *   console.log(action.error);
 * }
 */
export const actionCreator = <T>(type: ActionType): ActionCreator<T> => {
  return Object.assign((payload: T) => ({ type, payload }), {
    type,
    test(action: Action): action is ActionWithPayload<T> {
      return action.type === type;
    }
  });
};

/**
 * A type for asynchronous actions
 * @example
 * export const downloadFile(url: string): AsyncActionCreator => {
 *   return (dispatch: Dispatch, getState: () => RootState) => {
 *     dispatch(taskStart());
 *     // Sleep a bit
 *     dispatch(TaskError('No implemented'));
 *   }
 * }
 */
export type AsyncActionCreator = ThunkAction<void, RootState, unknown, Action | ActionWithPayload<unknown>>;

/**
 * Async dispatch type
 * Use this as the type for dispatch when mapping dispatchToProps
 */
export type Dispatch = ThunkDispatch<RootState, unknown, Action | ActionWithPayload<unknown>>;
