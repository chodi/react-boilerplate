/*
 * TODO
 *
 */
import { fromJS } from 'immutable';

import {
  ADD_TODO,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAIL,

  GET_TODO,
  GET_TODO_SUCCESS,
  GET_TODO_FAIL,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  allTodos: [],
  isLoading: false,
});

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TODO:
      return state.set('allTodos', fromJS([]))
        .set('isLoading', true);
    case GET_TODO_FAIL:
      return state.set('isLoading', false);
    case GET_TODO_SUCCESS:
      return state
        .set('isLoading', false)
        .set('allTodos', fromJS(action.payload));
    default:
      return state;
  }
}

export default todoReducer;
