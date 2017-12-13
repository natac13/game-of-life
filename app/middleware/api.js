import axios from 'axios';
import Promise from 'bluebird';
import {

} from '../actions/';
import {

} from '../constants/';

export const CALL_API = Symbol('Call API');




// Api Middleware itself
export default ({ dispatch, getState }) => (next) => (action) => {
  const callAPI = action[CALL_API];

  // pass to next middleware if normal action and not a CALL_API action
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { type } = action;

/* ====================================
  =            Source Data            =
=====================================*/

/* =====  End of Security API  ======*/

  return next(action);
};
