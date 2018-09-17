import { takeLatest, call, put } from "redux-saga/effects";
import { CounterAction, counterActions } from "../modules/Counter";
import { QiitaAction, qiitaActions } from "../modules/Qiita";
import { fetchUser } from "../domain/Qiita";

const sleep = microSecond =>
  new Promise(resolve => setTimeout(resolve, microSecond));

function* asyncIncrement(action: CounterAction) {
  console.log(action);
  yield call(sleep, 500);
  yield put(counterActions.increment());
}

function* asyncDecrement(action: CounterAction) {
  console.log(action);
  yield sleep(500);
  yield put(counterActions.decrement());
}

function* fetchQiitaUser(action: QiitaAction) {
  try {
    const user = yield call(fetchUser, action.payload);
    yield put(qiitaActions.fetchUserSuccess(user));
  } catch (error) {
    yield put(qiitaActions.fetchUserFailure({ error }));
  }
}

function* rootSaga() {
  // TODO ActionTypeはエクスポートして使えるようにしたほうが良い
  yield takeLatest("POST_INCREMENT_REQUEST", asyncIncrement);
  yield takeLatest("POST_DECREMENT_REQUEST", asyncDecrement);
  yield takeLatest("POST_FETCH_USER_REQUEST", fetchQiitaUser);
}

export default rootSaga;
