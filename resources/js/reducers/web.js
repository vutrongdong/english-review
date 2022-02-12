import * as webConst from '@/constants/web';

const web = (state = {}, action) => {
    switch (action.type) {
        case webConst.SEARCH_VOCABULARY_SUCCESS:
            return action.payload
        default:
        return state;
    }
}

export default web