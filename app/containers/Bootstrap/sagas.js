/**
 * Gets
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import request from 'utils/request';
import { logoutSuccess, getCredentialsSuccess } from './actions';
import { LOGOUT, GET_CREDENTIAL } from './constants';


  /*
  *Logout User handler
  */
export function* logout() {
  const requestURL = 'http://localhost:3000/logout';
  const result = yield call(request, requestURL);
  if (result) {
    yield put(logoutSuccess());
  }
}

export function* getCredentialSaga() {
  yield put(getCredentialsSuccess());
}

/**
 * Root saga manages watcher lifecycle
 */
function* watchers() {
  yield takeEvery(LOGOUT, logout);
  yield takeEvery(GET_CREDENTIAL, getCredentialSaga);
}

export default [watchers];
