import { apiRequest } from '@/apis/apiRequest';
import { toastSuccess } from '@/commons/helpers/toastHelper';
import { buildParams } from '@/commons/helpers/pagination';

export const getTests = async (params, pushParams = true) => {
    const paramsUrl = buildParams(params);
    if (pushParams) window.history.pushState('', '', paramsUrl);
    const path = `/api/tests${paramsUrl}`;
    const tests = await apiRequest(path, 'get');
    return tests;
};

export const getTest = async (id) => {
    const test = await apiRequest(`/api/tests/${id}`, 'get');
    return test.data;
};

export const deleteTest = async (id) => {
    await apiRequest(`/api/tests/${id}`, 'delete');
    toastSuccess('Xóa bài thi thành công');
};

export const createTest = async (data) => {
    await apiRequest(`/api/tests/create`, 'post', data);
};

export const editTest = async (data) => {
    await apiRequest(`/api/tests/edit`, 'put', data);
};