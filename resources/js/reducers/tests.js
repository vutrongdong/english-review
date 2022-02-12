import * as testConst from '@/constants/tests';

const tests = (state = {}, action) => {
    switch (action.type) {
        case testConst.FETCH_TEST_SUCCESS:
            return action.payload
        default:
        return state;
    }
}

export default tests
