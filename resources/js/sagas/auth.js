import { call, put, takeLatest } from 'redux-saga/effects';
import * as authConstant from '@/constants/auth';
import * as apiAuth from '@/apis/auth';

function* watchLogoutAction() {
  try {
    yield call(apiAuth.logoutSystem);
  } catch (error) {
    yield put(logoutError(error))
  }
};

function* authSaga() {
  yield takeLatest(authConstant.LOGOUT_SYSTEM, watchLogoutAction);
}

export default authSaga;