import { put } from 'redux-saga/effects';
import createApiGenerator from 'utils/sagas/ApiGenerator';
import apiRequestSaga from 'utils/sagas/apiRequestSaga';
import { deleteTodo } from 'api/todo-apis';

import {
  deleteTodo as deleteTodoData,
  deleteTodoSuccess,
  deleteTodoFail,
} from '../actions';

function* deleteTodosSaga(id, actions) {
  const { fnFire, fnSuccess, fnFail } = actions;
  yield put(fnFire(id));
  const {
    result,
    error,
  } = yield apiRequestSaga(deleteTodo, id);
  if (result) {
    yield put(fnSuccess(id));
  } else if (error) {
    const errObj = error.error ? { ...error.error } : { error };
    yield put(fnFail(id, errObj));
  }
  return { result, error };
}

const actions = {
  fnFire: deleteTodoData,
  fnSuccess: deleteTodoSuccess,
  fnFail: deleteTodoFail,
};

const createDeleteTodosApi = createApiGenerator(actions)(deleteTodosSaga);

export default createDeleteTodosApi;
