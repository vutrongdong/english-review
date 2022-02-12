import * as userConst from '@/constants/users';

const users = (state = {}, action) => {
    switch (action.type) {
        case userConst.FETCH_USER_SUCCESS:
            return action.payload
        default:
        return state;
    }
}

export default users
