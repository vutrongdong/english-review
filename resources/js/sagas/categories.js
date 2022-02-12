import { toastError } from '@/commons/helpers/toastHelper';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as constCategories from '@/constants/categories';
import * as actionCategories from '@/actions/categories';
import * as apiCategories from '@/apis/categories';

function* watchFetchListCategoryAction({payload}) {
  try {
    const response = yield call(apiCategories.getCategories, payload);
    yield put(actionCategories.fetchListCategorySuccess(response.data));
  } catch (error) {
    console.error(error)
    yield put(actionCategories.fetchListCategoryError(error));
  }
}

function* watchDeleteCategoryAction({payload}) {
  try {
    yield call(apiCategories.deleteCategory, payload);
    yield put(actionCategories.getCategories({page: 1}));
  } catch (error) {
    console.error(error)
    toastError('Bạn không được phép xóa danh mục này');
  }
}

function* categorySaga() {
    yield takeLatest(constCategories.FETCH_CATEGORY, watchFetchListCategoryAction);
    yield takeLatest(constCategories.DELETE_CATEGORY, watchDeleteCategoryAction);
}

export default categorySaga;