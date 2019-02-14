import axios from 'axios';

const TOKEN_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

function applySecurityHeadersToAxiosRequests() {
    axios.defaults.headers.get['Authorization'] = 'Bearer ' + axios.getSecurityTokenData();
    axios.defaults.headers.put['Authorization'] = 'Bearer ' + axios.getSecurityTokenData();
    axios.defaults.headers.post['Authorization'] = 'Bearer ' + axios.getSecurityTokenData();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + axios.getSecurityTokenData();
}

function applyContentTypeHeadersToAxiosRequests() {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.put['Content-Type'] = 'application/json';
    axios.defaults.headers.get['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
}

function clearSecurityHeadersFromAxiosRequests() {
    delete axios.defaults.headers.get['Authorization'];
    delete axios.defaults.headers.put['Authorization'];
    delete axios.defaults.headers.post['Authorization'];
    delete axios.defaults.headers.common['Authorization'];
}

axios.getSecurityTokenData = function() {
    return sessionStorage.getItem(TOKEN_KEY) || '';
}

axios.setSecurityTokenData = function(responseData) {
    sessionStorage.setItem(TOKEN_KEY, responseData.access_token);
    sessionStorage.setItem(REFRESH_KEY, responseData.refresh_token);
    applySecurityHeadersToAxiosRequests();
}

axios.clearSecurityTokenData = function() {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_KEY);
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
                token: sessionStorage.getItem(TOKEN_KEY),
                refreshToken: sessionStorage.getItem(REFRESH_KEY)
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