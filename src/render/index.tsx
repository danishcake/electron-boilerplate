import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from './reducers';
import Root from './Root';

const { history, store } = createStore();

render(
  <Provider store={store}>
    <Root/>
  </Provider>,
  document.getElementById('root')
);
