import { call, put, takeLatest } from 'redux-saga/effects';
import * as constTests from '@/constants/tests';
import * as apiTests from '@/apis/tests';
import * as actionTests from '@/actions/tests';

function* watchFetchListTestAction({payload}) {
  try {
    const response = yield call(apiTests.getTests, payload);
    yield put(actionTests.fetchListTestSuccess(response.data));
  } catch (error) {
    console.error(error)
    yield put(actionTests.fetchListTestError(error));
  }
}

function* testSaga() {
    yield takeLatest(constTests.FETCH_TEST, watchFetchListTestAction);
}

export default testSaga;