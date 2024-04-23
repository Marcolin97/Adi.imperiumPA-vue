import axios from 'axios';
import Cookies from 'js-cookie';

const baseApiCookie = axios.create({
    baseURL: 'http://192.168.0.108/api',
});

export default baseApiCookie;


//0.108