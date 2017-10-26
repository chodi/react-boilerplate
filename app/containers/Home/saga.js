/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGOUT } from 'containers/Home/constants';
import { logoutSuccess } from 'containers/Home/actions';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const requestURL = 'http://localhost:3000/logout';

    // Call our request helper (see 'utils/request')
    console.log("requestURL", requestURL)
    const hello = yield call(request, requestURL);
    console.log("hello error", hello)
    if (hello) {
      yield put(logoutSuccess());
    }
}


/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOGOUT, getRepos);
}
