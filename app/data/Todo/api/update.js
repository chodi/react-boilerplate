import { put } from 'redux-saga/effects';
import createApiGenerator from 'utils/sagas/ApiGenerator';
import apiRequestSaga from 'utils/sagas/apiRequestSaga';
import { updateTodo } from 'api/todo-apis';

import {
  updateTodo as updateTodoData,
  updateTodoSuccess,
  updateTodoFail,
} from '../actions';

function* updateTodosSaga(data, actions) {
  const { fnFire, fnSuccess, fnFail } = actions;
  const { id, ...params } = data;
  yield put(fnFire(data));
  const {
    result,
    error,
  } = yield apiRequestSaga(updateTodo, id, params);
  if (result) {
    yield put(fnSuccess(result));
  } else if (error) {
    const errObj = error.error ? { ...error.error } : { error };
    yield put(fnFail(data, errObj));
  }
  return { result, error };
}

const actions = {
  fnFire: updateTodoData,
  fnSuccess: updateTodoSuccess,
  fnFail: updateTodoFail,
};

const createUpdateTodosApi = createApiGenerator(actions)(updateTodosSaga);

export default createUpdateTodosApi;
