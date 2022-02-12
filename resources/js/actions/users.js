import * as userConst from '@/constants/users';

export const getUsers = (params) => ({
    type: userConst.FETCH_USER,
    payload: params
});

export const fetchListUserSuccess = (users) => ({
    type: userConst.FETCH_USER_SUCCESS,
    payload: users
});

export const fetchListUserError = (error) => ({
    type: userConst.FETCH_USER_ERROR,
    payload: error
});

export const deleteUser = (id) => ({
    type: userConst.DELETE_USER,
    payload: id
});
