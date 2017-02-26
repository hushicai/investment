/**
 * @file 价值回归
 * @author hushicai(bluthcy@gmail.com)
 */

import {ON_VALUTION_PARAM_INPUT} from '../actions';

export default function valution(state = {}, action) {
  switch (action.type) {
    case ON_VALUTION_PARAM_INPUT:
      return Object.assign({}, state, action.valution);
    default:
      return state;
  }
}
