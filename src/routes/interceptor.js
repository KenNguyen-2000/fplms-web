import axios from 'axios';

const interceptor = axios.create({
    baseURL: process.env.REACT_APP_URL + '/api',
});

interceptor.interceptors.request.use(function (req) {
    const token = localStorage.getItem('token');
    if (token && req.headers) req.headers['Authorization'] = `${token}`;

    // req.headers['Content-Type'] = 'application/json';
    return req;
});

interceptor.interceptors.response.use(
    function (res) {
        return res;
    },
    function (error) {
        if (error.response.status === 401) {
            localStorage.removeItem('accessToken');
            window.location.assign('/login');
        }
        return Promise.reject(error.response);
    }
);

export default interceptor;
