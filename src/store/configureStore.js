/**
 * @file store
 * @author hushicai(bluthcy@gmail.com)
 */

import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';

const logger = createLogger();

const configureStore = (preloadedState) => {
  const middlewares = [
    thunk,
    routerMiddleware(browserHistory),
    logger
  ];
  const createStoreEnhancer = applyMiddleware(...middlewares)(createStore);
  const store = createStoreEnhancer(reducers, preloadedState);

  return store;
};

export default configureStore;
