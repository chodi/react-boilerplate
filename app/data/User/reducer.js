/*
 * TODO
 *
 */
import { fromJS } from 'immutable';
import {
} from './constants';

// The initial state of the App
const initialState = fromJS({
  name: window.USER.name,
  email: window.USER.email,
  username: window.USER.user,
});

function bootstrap(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
export default bootstrap;
