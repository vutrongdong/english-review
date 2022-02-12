import { apiRequest } from '@/apis/apiRequest';
import { toastSuccess } from '@/commons/helpers/toastHelper';
import { buildParams } from '@/commons/helpers/pagination';

export const getUsers = async (params, pushParams = true) => {
    const paramsUrl = buildParams(params);
    if (pushParams) window.history.pushState('', '', paramsUrl);
    const path = `/api/users${paramsUrl}`;
    const users = await apiRequest(path, 'get');
    return users;
};

export const getUser = async (id) => {
    const user = await apiRequest(`/api/users/${id}`, 'get');
    return user.data;
};

export const deleteUser = async (id) => {
    await apiRequest(`/api/users/${id}`, 'delete');
    toastSuccess('Xóa người dùng thành công');
};

export const createUser = async (data) => {
    const result = await apiRequest(`/api/users/create`, 'post', data);
    return result;
};

export const editUser = async (data) => {
    const result = await apiRequest(`/api/users/edit`, 'put', data);
    return result;
};