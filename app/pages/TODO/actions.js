import {
  ADD_TODO,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAIL,

  GET_TODO,
  GET_TODO_SUCCESS,
  GET_TODO_FAIL,
} from './constants';

// ****************************************
// Add todo
// ****************************************
export const addTodo = (payload) => ({
  type: ADD_TODO,
  payload,
});

export const addTodoSuccess = (payload) => ({
  type: ADD_TODO_SUCCESS,
  payload,
});

export const addTodoFail = (payload) => ({
  type: ADD_TODO_FAIL,
  payload,
});

// ****************************************
// Get todo
// ****************************************
export const getTodo = (payload) => ({
  type: GET_TODO,
  payload,
});

export const getTodoSuccess = (payload) => ({
  type: GET_TODO_SUCCESS,
  payload,
});

export const getTodoFail = (payload) => ({
  type: GET_TODO_FAIL,
  payload,
});
