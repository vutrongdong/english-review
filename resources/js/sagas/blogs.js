import { call, put, takeLatest } from 'redux-saga/effects';
import { toastError } from '@/commons/helpers/toastHelper';
import * as constBlogs from '@/constants/blogs';
import * as apiBlogs from '@/apis/blogs';
import * as actionBlogs from '@/actions/blogs';

function* watchFetchListBlogAction({payload}) {
  try {
    const response = yield call(apiBlogs.getBlogs, payload);
    yield put(actionBlogs.fetchListBlogSuccess(response.data));
  } catch (error) {
    console.error(error)
    yield put(actionBlogs.fetchListBlogError(error));
  }
}

function* watchDeleteBlogAction({payload}) {
  try {
    yield call(apiBlogs.deleteBlog, payload);
    yield put(actionBlogs.getBlogs({page: 1}));
  } catch (error) {
    console.error(error)
    toastError('Bạn không được phép xóa bài viết này');
  }
}

function* blogSaga() {
    yield takeLatest(constBlogs.FETCH_BLOG, watchFetchListBlogAction);
    yield takeLatest(constBlogs.DELETE_BLOG, watchDeleteBlogAction);
}

export default blogSaga;