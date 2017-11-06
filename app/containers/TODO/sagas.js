import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'utils/node-fetch-request';
import { ADD_TODO, GET_TODO } from './constants';
import {
  addTodoSuccess,
  addTodoFail,

  getTodoSuccess,
  getTodoFail,
} from './actions';

/**
 * Get Todo
 */
export function* getTodoSaga() {
  const username = window.USER.name;
  const requestURL = `http://localhost:3000/api/v1/Todo?query={"owner":"${username}"}`;
  const { result, error } = yield call(request.getRequest, requestURL);
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
  // Select username from store
  const username = window.USER.name;
  const todoPayload = { owner: username, ...payload };
  const requestURL = `http://localhost:3000/api/v1/Todo`;
  try {
    // Call our request helper (see 'utils/request')
    const newTodos = yield call(request.postRequest, requestURL, todoPayload);
    yield put(addTodoSuccess(newTodos.result));
  } catch (err) {
    yield put(addTodoFail(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
function* watchers() {
  yield takeEvery(GET_TODO, getTodoSaga);
  yield takeEvery(ADD_TODO, addTodoSaga);
}

export default [watchers];
