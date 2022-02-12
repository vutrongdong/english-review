import { apiRequest } from '@/apis/apiRequest';

export const sendEmailContact = async (data) => {
    await apiRequest(`/api/email_contact`, 'post', data);
};