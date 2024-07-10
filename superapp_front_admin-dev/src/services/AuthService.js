import {jwtDecode} from 'jwt-decode';
import http from './HttpService';

const apiURL = process.env.nextAppApiUrl;
const tokenKey = "token";

export function getJwt() {
    return typeof window !== "undefined" && localStorage?.getItem('token')
}

http.setJwt(getJwt());

export async function login(payload) {
    const {data, status} = await http.post(apiURL + '40003/auth/login', payload);
    if(typeof window !== "undefined") {
        localStorage.setItem(tokenKey, data?.token);
    }   
    return status;
}

export const getCurrentUser = () => {
    try {
        const jwt = localStorage.getItem('token');
        return jwtDecode(jwt)
    } catch (ex) {
        return null;
    }
}