import { apiRequest } from '@/apis/apiRequest';
import { toastError } from '@/commons/helpers/toastHelper';

export const getCities = async () => {
    try {
        const cities = await apiRequest(`/api/cities`, 'get');
        return cities;
    } catch (error) {
        console.error(error);
        toastError(error);
    }
};

export const getDistricts = async (city_id) => {
    try {
        const districts = await apiRequest(`/api/districts/${city_id}`, 'get');
        return districts.data;
    } catch (error) {
        console.error(error);
        toastError(error);
    }
};