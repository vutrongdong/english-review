import * as blogConst from '@/constants/blogs';

const blogs = (state = {}, action) => {
    switch (action.type) {
        case blogConst.FETCH_BLOG_SUCCESS:
            return action.payload
        default:
        return state;
    }
}

export default blogs