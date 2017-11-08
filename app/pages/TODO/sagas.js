import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'utils/node-fetch-request';
import createGetTodosApi from 'data/Todo/api/get';
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
const getTodosApi = createGetTodosApi(stateName);

export function* getTodoSaga() {
  const username = window.USER.name;
  const host = window.location.origin;
  // const requestURL = `${host}/api/v1/Todo?query={"owner":"${username}"}`;
  const { result, error } = yield call(getTodosApi, username);
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
  const host = window.location.origin;
  const requestURL = `${host}/api/v1/Todo`;
  try {
    const newTodos = yield call(request.postRequest, requestURL, todoPayload);
    yield put(addTodoSuccess(newTodos.result));
  } catch (err) {
    yield put(addTodoFail(err));
  }
}

/**
 * update Todo
 */
export function* updateTodoSaga({ payload }) {
  // Select username from window
  const { _id, ...params } = payload;
  const host = window.location.origin;
  const requestURL = `${host}/api/v1/Todo/${_id}`;
  try {
    const updateTodo = yield call(request.updateRequest, requestURL, _id, params);
    yield put(updateTodoSuccess(updateTodo.result));
  } catch (err) {
    yield put(updateTodoFail(err));
  }
}
/**
 * delete Todo
 */
export function* deleteTodoSaga({ payload }) {
  const { _id } = payload;
  const host = window.location.origin;
  const requestURL = `${host}/api/v1/Todo/${_id}`;
  try {
    const newTodos = yield call(request.deleteRequest, requestURL, _id);
    yield put(deleteTodoSuccess({ result: [newTodos.result], id: _id }));
  } catch (err) {
    yield put(deleteTodoFail(err));
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
