import * as constCategories from '@/constants/categories';

const categories = (state = {}, action) => {
    switch (action.type) {
        case constCategories.FETCH_CATEGORY_SUCCESS:
            return action.payload
        default:
        return state;
    }
}

export default categories