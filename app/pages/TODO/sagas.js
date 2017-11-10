import { call, put, takeEvery } from 'redux-saga/effects';
import createAddTodosApi from 'data/Todo/api/create';
import createGetTodosApi from 'data/Todo/api/get';
import createUpdateTodosApi from 'data/Todo/api/update';
import createDeleteTodosApi from 'data/Todo/api/delete';

import { ADD_TODO, UPDATE_TODO, DELETE_TODO, GET_TODO } from './constants';
import stateName from './stateName';
import {
  addTodoSuccess,
  addTodoFail,

  updateTodoSuccess,
  updateTodoFail,

  deleteTodoSuccess,
  deleteTodoFail,

  getTodoSuccess,
  getTodoFail,
} from './actions';

/**
 * Get Todo
 */
const addTodosApi = createAddTodosApi(stateName);
const getTodosApi = createGetTodosApi(stateName);
const updateTodosApi = createUpdateTodosApi(stateName);
const deleteTodosApi = createDeleteTodosApi(stateName);

export function* getTodoSaga({ payload }) {
  const { result, error } = yield call(getTodosApi, payload);
  if (result) {
    yield put(getTodoSuccess(result));
  } else {
    yield put(getTodoFail(error));
  }
}

/**
 * Add Todo
 */
export function* addTodoSaga({ payload }) {
  // Select username from window
  const username = window.USER.name;
  const todoPayload = { owner: username, ...payload };
  try {
    const newTodos = yield call(addTodosApi, todoPayload);
    yield put(addTodoSuccess(newTodos.result));
  } catch (err) {
    yield put(addTodoFail(err));
  }
}

/**
 * update Todo
 */
export function* updateTodoSaga({ payload }) {
  try {
    const updateTodo = yield call(updateTodosApi, payload);
    yield put(updateTodoSuccess(updateTodo.result));
  } catch (err) {
    yield put(updateTodoFail(err));
  }
}
/**
 * delete Todo
 */
export function* deleteTodoSaga({ payload }) {
  const { id } = payload;
  const { result, error } = yield call(deleteTodosApi, id);
  if (result) {
    yield put(deleteTodoSuccess(result));
  } else {
    yield put(deleteTodoFail(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
function* watchers() {
  yield takeEvery(GET_TODO, getTodoSaga);
  yield takeEvery(ADD_TODO, addTodoSaga);
  yield takeEvery(UPDATE_TODO, updateTodoSaga);
  yield takeEvery(DELETE_TODO, deleteTodoSaga);
}

export default [watchers];
