import { call, put, select, takeEvery } from 'redux-saga/effects';
import { ADD_TODO, GET_TODO } from './constants';
import {
  addTodoSuccess,
  addTodoFail,

  getTodoSuccess,
  getTodoFail,
} from './actions';
import nodeFetchRequest from 'utils/node-fetch-request';

/**
 * Get Todo
 */
export function* getTodoSaga() {
  const username = 'christian@email.com';
  const requestURL = `http://localhost:3000/api/v1/Todo?query={"owner":"${username}"}`;
  const { result, error } = yield call(nodeFetchRequest, requestURL);
  if (result) {
    yield put(getTodoSuccess(result));
  } else {
    yield put(getTodoFail(error));
  }
}

/**
 * Add Todo
 */
// export function* addTodoSaga() {
//   // Select username from store
//   const username = yield select(makeSelectUsername());
//   const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

//   try {
//     // Call our request helper (see 'utils/request')
//     const repos = yield call(request, requestURL);
//     yield put(reposLoaded(repos, username));
//   } catch (err) {
//     yield put(repoLoadingError(err));
//   }
// }

/**
 * Root saga manages watcher lifecycle
 */
function* watchers() {
  yield takeEvery(GET_TODO, getTodoSaga);
}

export default [watchers];
