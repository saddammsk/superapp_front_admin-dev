import axios from 'axios';

axios.interceptors.response.use(null, (error) => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status <500;

    if (!expectedError) {
        console.log(error);
    }

    return Promise.reject(error);
})

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';

    return config;
}, (error) => {
    return Promise.reject(error)
});

function setJwt(jwt) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

const HttpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
}

export default HttpService