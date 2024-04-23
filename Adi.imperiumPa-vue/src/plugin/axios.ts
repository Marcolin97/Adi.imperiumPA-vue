import axios from 'axios';
//import Cookies from 'js-cookie';

axios.defaults.withCredentials = true
const baseApiCookie = axios.create({
    baseURL: 'http://adsa-api.imperiumpa.it/api',
    withCredentials : true
});

export default baseApiCookie;


//0.108