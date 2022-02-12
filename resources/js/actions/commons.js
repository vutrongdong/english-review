import * as commonConst from '@/constants/commons';

export const getCities = () => ({
    type: commonConst.FETCH_CITIES
});

export const fetchListCitiesSuccess = (cities) => ({
    type: commonConst.FETCH_CITY_SUCCESS,
    payload: cities
});

export const setLoading = (loading) => ({
    type: commonConst.SET_LOADING,
    payload: loading
});