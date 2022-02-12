import { fork, all } from 'redux-saga/effects';
import categorySaga from '@/sagas/categories';
import commonSaga from '@/sagas/commons';
import userSaga from '@/sagas/users';
import blogSaga from '@/sagas/blogs';
import testSaga from '@/sagas/tests';
import authSaga from '@/sagas/auth';

function* rootSaga() {
  yield all([
    yield fork(categorySaga),
    yield fork(commonSaga),
    yield fork(userSaga),
    yield fork(testSaga),
    yield fork(authSaga),
    yield fork(blogSaga),
  ]);
}

export default rootSaga;
