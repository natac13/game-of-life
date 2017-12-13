import { combineReducers } from 'redux-immutable';
import { reducer as form, actionTypes } from 'redux-form/immutable';

import routing from './routing.js';
import error from './error.js';
import board from './board.js';

import {
} from '../constants/';

function clearReducer(state, action) {
  switch (action.type) {
    default:
      return undefined;
  }
}
const rootReducer = combineReducers(Object.assign(
  {},
  {
    routing,
    /** the redux-form plugin I am using is to reset/clear the securityForm upon
    submission. I got this code from the documentation at
    https://redux-form.com/6.0.0-alpha.4/docs/faq/howtoclear.md/*/
    form: form.plugin({
      // securityForm: clearReducer,
      // addForm: clearReducer,
    }),
    error,
    board,
  },
));

export default rootReducer;
