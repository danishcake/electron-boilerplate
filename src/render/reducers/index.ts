import { applyMiddleware, combineReducers, compose, createStore as reduxCreateStore } from 'redux';
import { createBrowserHistory, History } from 'history';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { clickCountReducer } from './ClickCount';
import { PickAndFlatten } from '../utils/TypeManipulation';

/**
 * Creates the root reducer
 * @param history History object for routing purposes
 * @returns The root reducer
 */
function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    clickCount: clickCountReducer
  });
}

/**
 * Creates the redux store
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createStore() {
  // Create a history object
  const history = createBrowserHistory();

  // Create the root reducer
  const rootReducer = createRootReducer(history);

  // Create the store
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = reduxCreateStore(rootReducer, composeEnhancers(applyMiddleware(thunk, routerMiddleware(history))));

  // The history object is required by routing components, to expose that too
  return { history, store };
}

/**
 * The type of the rootstate
 * This is pretty ghastly - sorry. To read it:
 * 1. createStore returns {store, history}
 * 2. We pick and flatten the store element
 * 3. We pick and flatten getState from the store
 * 4. We get the return type of getState
 *
 * This yields the root state type
 */
export type RootState = ReturnType<PickAndFlatten<PickAndFlatten<ReturnType<typeof createStore>, 'store'>, 'getState'>>;
