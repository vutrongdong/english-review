import { call, put, takeLatest } from 'redux-saga/effects';
import { toastError } from '@/commons/helpers/toastHelper';
import * as constUsers from '@/constants/users';
import * as actionUsers from '@/actions/users';
import * as apiUsers from '@/apis/users';

function* watchFetchListUserAction({payload}) {
  try {
    const response = yield call(apiUsers.getUsers, payload);
    yield put(actionUsers.fetchListUserSuccess(response.data));
  } catch (error) {
    console.error(error)
    yield put(actionUsers.fetchListUserError(error));
  }
}

function* watchDeleteUserAction({payload}) {
  try {
    yield call(apiUsers.deleteUser, payload);
    yield put(actionUsers.getUsers({page: 1}));
  } catch (error) {
    console.error(error)
    toastError('Bạn không được phép xóa người này');
  }
}

function* userSaga() {
    yield takeLatest(constUsers.FETCH_USER, watchFetchListUserAction);
    yield takeLatest(constUsers.DELETE_USER, watchDeleteUserAction);
}

export default userSaga;