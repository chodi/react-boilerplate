/*
 * TODO
 *
 */
import { fromJS } from 'immutable';
import arrayToMap from 'utils/arrayToMap';
import {
  ADD_TODO_SUCCESS,
  ADD_TODO_FAIL,

  GET_TODO_SUCCESS,
  GET_TODO_FAIL,

  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAIL,

  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAIL,
} from './constants';

// The initial state of the App
const initialState = fromJS({});

function todoReducer(state = initialState, action) {
  switch (action.type) {
    // ************************************
    // GET ToDo
    // ************************************
    case GET_TODO_FAIL:
      return state.set('error', action.payload);
    case GET_TODO_SUCCESS:
      return fromJS(arrayToMap(action.payload, 'id'));
    // ************************************
    // ADD ToDo
    // ************************************
    case ADD_TODO_FAIL:
      return state.set('error', action.payload);
    case ADD_TODO_SUCCESS: {
      const { id } = action.payload;
      return state
        .mergeIn([id], action.payload);
    }

    // ************************************
    // UPDATE ToDo
    // ************************************
    case UPDATE_TODO_FAIL:
      return state.set('error', action.payload);
    case UPDATE_TODO_SUCCESS: {
      const { id, ...params } = action.payload;
      return state
        .mergeIn([id], params);
    }

    // ************************************
    // DELETE ToDo
    // ************************************
    case DELETE_TODO_FAIL:
      return state;
    case DELETE_TODO_SUCCESS:
      return state
        .deleteIn([action.payload]);
    default:
      return state;
  }
}

export default todoReducer;
