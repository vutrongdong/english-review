import * as commonConst from '@/constants/commons';

const initState = {
    cities: [],
    loading: false
}

const commons = (state = initState, action) => {
    switch (action.type) {
        case commonConst.FETCH_CITY_SUCCESS:
            return {
                ...state,
                cities: action.payload.data
            }
        case commonConst.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
        return state;
    }
}

export default commons
