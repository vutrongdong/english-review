import * as authConst from '@/constants/auth';

export const setAuthentication = (user) => ({
    type: authConst.SET_USER_LOGIN,
    payload: user
});

export const logout = () => ({
    type: authConst.LOGOUT_SYSTEM
});

export const logoutSuccess = () => ({
    type: authConst.LOGOUT_SUCCESS
});

export const logoutError = () => ({
    type: authConst.LOGOUT_ERROR
});