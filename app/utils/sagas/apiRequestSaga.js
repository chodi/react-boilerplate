import { call, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
// import { authUnathorized } from 'data/Authentication/actions';
// import { AUTH_REBUILD_TOKEN_SUCCESS } from 'data/Authentication/constants';

/**
 * [*apiRequestSaga description]
 * @param {Function}    api           api to call
 * @param {...[type]} args          [description]
 * @yield {[type]}    [description]
 */
export default function* apiRequestSaga(api, ...args) {
  try {
    return {
      result: yield call(api, ...args),
    };
  } catch (error) {
    // console.log('apiRequestSaga err', error);
    // unathorized
    const hasErrorObj = typeof error === 'object' && Object.prototype.hasOwnProperty.call(error, 'error');
    if (hasErrorObj && error.error.status === 401) {
      // yield put(authUnathorized());
      // yield take(AUTH_REBUILD_TOKEN_SUCCESS);
    }
    return { error };
  }
}
export function* apiRequestSagaTimeout(api, ms = 10000, ...args) {
  try {
    const { timeout, result } = yield race({
      result: call(api, ...args),
      timeout: delay(ms),
    });

    return {
      result,
      timeout,
    };
  } catch (error) {
    // console.log('apiRequestSaga err', error);
    return { error };
  }
}
