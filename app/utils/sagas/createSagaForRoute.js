import { take, fork, race } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

const createSagaForRoute = (pattern, handler) => function* locationWrapper() {
  while (true) {
    // needed to fix the issue of re-injecting sagas of a dynamic route
    const { stop, action } = yield race({
      action: take(pattern),
      stop: take(LOCATION_CHANGE),
    });

    if (stop) break;

    yield fork(handler, action);
  }
};

export default createSagaForRoute;
