import * as categoryConst from '@/constants/categories';

export const getCategories = (params) => ({
    type: categoryConst.FETCH_CATEGORY,
    payload: params
});

export const fetchListCategorySuccess = (categories) => ({
    type: categoryConst.FETCH_CATEGORY_SUCCESS,
    payload: categories
});

export const fetchListCategoryError = (error) => ({
    type: categoryConst.FETCH_CATEGORY_ERROR,
    payload: error
});

export const deleteCategory = (id) => ({
    type: categoryConst.DELETE_CATEGORY,
    payload: id
});