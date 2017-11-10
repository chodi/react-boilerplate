import { put } from 'redux-saga/effects';
import createApiGenerator from 'utils/sagas/ApiGenerator';
import apiRequestSaga from 'utils/sagas/apiRequestSaga';
import { getTodo } from 'api/todo-apis';

import {
  getTodo as getTodoData,
  getTodoSuccess,
  getTodoFail,
} from '../actions';

function* getTodosSaga(id, actions) {
  const { fnFire, fnSuccess, fnFail } = actions;
  yield put(fnFire(id));
  const {
    result,
    error,
  } = yield apiRequestSaga(getTodo, { id });
  // } = yield apiRequestSaga(getTodo, { query: `{"owner":"${id}"}` });
  if (result) {
    yield put(fnSuccess(result));
  } else if (error) {
    const errObj = error.error ? { ...error.error } : { error };
    yield put(fnFail(id, errObj));
  }
  return { result, error };
}

const actions = {
  fnFire: getTodoData,
  fnSuccess: getTodoSuccess,
  fnFail: getTodoFail,
};

const createGetTodosApi = createApiGenerator(actions)(getTodosSaga);

export default createGetTodosApi;
