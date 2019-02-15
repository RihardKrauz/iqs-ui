import axios from 'axios';
import { STORAGE_KEYS } from './storage';

axios.getApiUri = function() {
    return 'http://localhost:1056';
}

function applySecurityHeadersToAxiosRequests() {
    const headers = axios.defaults.headers;
    for (let prop in headers) {
        headers[prop]['Authorization'] = 'Bearer ' + axios.getSecurityTokenData();
    }
}

function applyContentTypeHeadersToAxiosRequests() {
    const headers = axios.defaults.headers;
    for (let prop in headers) {
        headers[prop]['Content-Type'] = 'application/json';
    }
}

function clearSecurityHeadersFromAxiosRequests() {
    const headers = axios.defaults.headers;
    for (let prop in headers) {
        delete headers[prop]['Authorization'];
    }
}

axios.getSecurityTokenData = function() {
    return localStorage.getItem(STORAGE_KEYS.TOKEN_KEY) || '';
}

axios.setSecurityTokenData = function(responseData) {
    localStorage.setItem(STORAGE_KEYS.TOKEN_KEY, responseData.access_token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_KEY, responseData.refresh_token);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, responseData.username);
    applySecurityHeadersToAxiosRequests();
}

axios.clearSecurityTokenData = function() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN_KEY);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_KEY);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    clearSecurityHeadersFromAxiosRequests();
}

applyContentTypeHeadersToAxiosRequests();
applySecurityHeadersToAxiosRequests();

axios.interceptors.response.use(
    response => {
        if (response.data && response.data.isOk === false) {
            return Promise.reject(response.data.exceptionMessage || response.data.value);
        }

        return Promise.resolve(response.data.value);
    },
    error => {
        if (error.response.status === 401 && error.response.headers['token-expired']) {
            const securityData = JSON.stringify({ 
                access_token: localStorage.getItem(STORAGE_KEYS.TOKEN_KEY),
                refresh_token: localStorage.getItem(STORAGE_KEYS.REFRESH_KEY),
                username: localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
            });
    
            return axios.put(`${axios.getApiUri()}/token`, securityData)
            .then(response => {
                console.log('Updating security token');
                axios.setSecurityTokenData(response);
            })
            .catch((ex) => {
                console.log('Error while updating tokens: ', ex);
            })
            .then(() => {
                error.config.headers['Authorization'] = 'Bearer ' + axios.getSecurityTokenData();
                return axios.request(error.config)
                    .then((retriedResponse) => {
                        return retriedResponse;
                    });
            });
        }
        return Promise.reject(error);
    }
);

export default axios;