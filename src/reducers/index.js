
import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

import valution from './valution';

export default combineReducers({
  valution,
  routing
});
