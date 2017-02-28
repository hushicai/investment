/**
 * @file client
 * @author hushicai(bluthcy@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';

const store = configureStore(window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById("root")
);
