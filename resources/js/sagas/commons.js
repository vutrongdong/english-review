import { call, put, takeLatest } from 'redux-saga/effects';
import * as constCommons from '@/constants/commons';
import * as apiCommons from '@/apis/commons';
import * as actionCommons from '@/actions/commons';

function* watchFetchListCityAction() {
    try {
      const cities = yield call(apiCommons.getCities);
      yield put(actionCommons.fetchListCitiesSuccess(cities));
    } catch (error) {
      console.error(error)
    }
}
  
function* commonSaga() {
    yield takeLatest(constCommons.FETCH_CITIES, watchFetchListCityAction);
}

export default commonSaga;
