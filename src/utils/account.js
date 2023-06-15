import jwt_decode from 'jwt-decode';

const getTokenInfo = () => {
    const token = localStorage.getItem('token');
    return jwt_decode(token);
};

export { getTokenInfo };
