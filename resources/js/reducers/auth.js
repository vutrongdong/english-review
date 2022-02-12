import * as authConst from '@/constants/auth';

const auth = (state = {}, action) => {
    switch (action.type) {
        case authConst.SET_USER_LOGIN:
            return action.payload.user;
        default:
            return state;
    }
}

export default auth
