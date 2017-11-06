/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  GET_CREDENTIAL,
  LOGOUT_SUCCESS,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  name: null,
  email: null,
  password: null,
  id: null,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      return state.set(initialState);
    case GET_CREDENTIAL:
      return state
        .set('name', window.USER.name)
        .set('email', window.USER.email)
        .set('username', window.USER.username);
    default:
      return state;
  }
}

export default homeReducer;
