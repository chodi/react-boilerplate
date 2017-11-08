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

  // UPDATE_TODO,
  // UPDATE_TODO_SUCCESS,
  // UPDATE_TODO_FAIL,

  // DELETE_TODO,
  // DELETE_TODO_SUCCESS,
  // DELETE_TODO_FAIL,
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
      return fromJS(arrayToMap(action.payload, '_id'));
    // ************************************
    // ADD ToDo
    // ************************************


    case ADD_TODO_FAIL:
      return state
    case ADD_TODO_SUCCESS: {
      const { _id } = action.payload;
      return state
        .mergeIn([_id], action.payload);
    }
   /*

    START OF COMMENT

    // ************************************
    // DELETE ToDo
    // ************************************
    case DELETE_TODO:
      return state
    case DELETE_TODO_FAIL:
      return state
    case DELETE_TODO_SUCCESS:
      return state
        .deleteIn(['allTodos', action.payload.id])
    // ************************************
    // UPDATE ToDo
    // ************************************
    case UPDATE_TODO:
      return state
    case UPDATE_TODO_FAIL:
      return state
    case UPDATE_TODO_SUCCESS: {
      const { _id, ...params } = action.payload;
      return state
        .mergeIn(['allTodos', _id], params)
    }
    END OF COMMENT
    */
    default:
      return state;
  }
}

export default todoReducer;
