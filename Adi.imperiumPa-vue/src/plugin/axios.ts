import axios from 'axios';
//import Cookies from 'js-cookie';

axios.defaults.withCredentials = true
const baseApiCookie = axios.create({
    baseURL: 'https://adsa.imperiumpa.it/api',
    withCredentials : true
});

export default baseApiCookie;


