import axios from 'axios';
import { ENV } from '@/constants/config';

const apiRequest = (url, methodType, data = {}, multipart = false) => {
    let headers;
    headers = {};
    headers['token_api'] = ENV.TOKEN_API;

    if (multipart) {
        headers['content-type'] = 'multipart/form-data';
    }

    return new Promise(
        (resolve, reject) => {
            axios({
                method: methodType,
                url: url,
                data: data,
                headers: headers
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(function (error) {
                if (error && error.response && error.response.status === 401) {
                    // window.location.reload();
                    console.warn('unauthorized, logging out ...' + url);
                }
                reject(error.response.data);
            });
        });
};


export { apiRequest }
