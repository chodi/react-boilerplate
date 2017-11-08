import { put } from 'redux-saga/effects';
import createApiGenerator from 'utils/sagas/ApiGenerator';
import apiRequestSaga from 'utils/sagas/apiRequestSaga';
import { addTodo } from 'api/todo-apis';

import {
  addTodo as addTodoData,
  addTodoSuccess,
  addTodoFail,
} from '../actions';

function* addTodosSaga(data, actions) {
  const { fnFire, fnSuccess, fnFail } = actions;
  yield put(fnFire(data));
  const {
    result,
    error,
  } = yield apiRequestSaga(addTodo, data);
  if (result) {
    yield put(fnSuccess(result));
  } else if (error) {
    const errObj = error.error ? { ...error.error } : { error };
    yield put(fnFail(data, errObj));
  }
  return { result, error };
}

const actions = {
  fnFire: addTodoData,
  fnSuccess: addTodoSuccess,
  fnFail: addTodoFail,
};

const createAddTodosApi = createApiGenerator(actions)(addTodosSaga);

export default createAddTodosApi;
