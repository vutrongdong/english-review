import * as testConst from '@/constants/tests';

export const getTests = (params) => ({
    type: testConst.FETCH_TEST,
    payload: params
});

export const fetchListTestSuccess = (tests) => ({
    type: testConst.FETCH_TEST_SUCCESS,
    payload: tests
});

export const fetchListTestError = (error) => ({
    type: testConst.FETCH_TEST_ERROR,
    payload: error
});
