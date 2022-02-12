import { apiRequest } from '@/apis/apiRequest';
const AUTH_PREFIX = 'abudory';

export const logoutSystem = async () => {
    await apiRequest(`/${AUTH_PREFIX}/logout`, 'post');
};

export const login = async (user) => {
    await apiRequest(`/${AUTH_PREFIX}/login`, 'post', user);
};

export const register = async (user) => {
    await apiRequest(`/${AUTH_PREFIX}/register`, 'post', user);
};

export const sendEmailResetPassword = async (user) => {
    await apiRequest(`/${AUTH_PREFIX}/password/email`, 'post', user);
};

export const resetPassword = async (user) => {
    await apiRequest(`/${AUTH_PREFIX}/password/reset`, 'post', user);
};

export const updatePassword = async (user) => {
    await apiRequest('/api/users/profile/update_password', 'post', user);
};

export const authUser = async () => {
    const user = await apiRequest(`/api/users/auth`, 'get');
    return user;
};