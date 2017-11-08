/*
 * Bootstrap Reducer
 */
import { fromJS } from 'immutable';
import stateName from './stateName';
import {
  GET_CREDENTIAL,
  GET_CREDENTIAL_SUCCESS,
  LOGOUT_SUCCESS,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  isLoading: true,
});

function bootstrap(state = initialState, action) {
  switch (action.type) {
    case GET_CREDENTIAL:
      return state
        .set('isLoading', true);
    case GET_CREDENTIAL_SUCCESS:
      return state
        .set('isLoading', false);
    default:
      return state;
  }
}

export default { reducer: bootstrap, stateName };
