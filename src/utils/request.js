// import axios from 'axios';
import interceptor from '../routes/interceptor';

// const header = {
//     Authorization: `${localStorage.getItem('token')}`,
// };

const post = (url, body, head) => {
    const API = '/management' + url;
    return interceptor.post(API, body, { headers: { ...head } });
};

const get = (url, params) => {
    const API = '/management' + url;
    return interceptor.get(API, { params: { ...params } });
};

const put = (url, body, head) => {
    const API = '/management' + url;
    return interceptor.put(API, body, { ...head });
};

export { post, get, put };
