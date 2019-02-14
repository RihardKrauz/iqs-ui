import axios from 'axios';

const TOKEN_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';
const CURRENT_USER = 'currentUser';

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
    return localStorage.getItem(TOKEN_KEY) || '';
}

axios.setSecurityTokenData = function(responseData) {
    localStorage.setItem(TOKEN_KEY, responseData.access_token);
    localStorage.setItem(REFRESH_KEY, responseData.refresh_token);
    localStorage.setItem(CURRENT_USER, responseData.username);
    applySecurityHeadersToAxiosRequests();
}

axios.clearSecurityTokenData = function() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(CURRENT_USER);
    clearSecurityHeadersFromAxiosRequests();
}

applyContentTypeHeadersToAxiosRequests();
applySecurityHeadersToAxiosRequests();

axios.interceptors.response.use(
    response => {
        if (response.data && response.data.isOk === false) {
            return Promise.reject(response.data.exceptionMessage || response.data.value);
        }
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(response.data.value);
        } catch(ex) {
            console.error('Parse error', response.data.value);
            Promise.resolve(response.data)
        }
        return Promise.resolve(parsedResponse);
    },
    error => {
        if (error.response.status === 401 && error.response.headers['token-expired']) {
            const securityData = JSON.stringify({ 
                token: localStorage.getItem(TOKEN_KEY),
                refreshToken: localStorage.getItem(REFRESH_KEY)
            });
    
            return axios.put('http://localhost:1056/token', securityData /*, { headers } */)
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