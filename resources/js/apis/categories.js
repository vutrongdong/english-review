import { apiRequest } from '@/apis/apiRequest';
import { buildParams } from '@/commons/helpers/pagination';
import { toastSuccess } from '@/commons/helpers/toastHelper';

export const getCategories = async (params, pushParams = true) => {
    const paramsUrl = buildParams(params);
    if (pushParams) window.history.pushState('', '', paramsUrl);
    const path = `/api/categories${paramsUrl}`;
    const categories = await apiRequest(path, 'get');
    return categories;
};

export const deleteCategory = async (id) => {
    await apiRequest(`/api/categories/${id}`, 'delete');
    toastSuccess('Xóa danh mục thành công');
};

export const getCategory = async (id) => {
    const category = await apiRequest(`/api/categories/${id}`, 'get');
    return category.data;
};

export const createCategory = async (data) => {
    const result = await apiRequest(`/api/categories/create`, 'post', data);
    return result;
};

export const editCategory = async (data) => {
    const result = await apiRequest(`/api/categories/edit`, 'put', data);
    return result;
};