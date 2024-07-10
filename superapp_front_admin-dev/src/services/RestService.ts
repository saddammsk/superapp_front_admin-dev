// utils/auth.js
import axios from 'axios';
import Cookies from 'js-cookie';

const baseUrl = process.env.BASE_URL;
const token = Cookies.get('token');
const headers = {
  "Content-Type": "application/json",
  "Authorization": token ? `Bearer ${token}` : null
};

export const get = async (path: String) => {
  try {
    const response = await axios.get(`${baseUrl}${path}`, { headers: headers });
    return response;
  } catch (error: any) {
    console.error('Error ', error)
    throw new Error(error.response?.data?.error?.message || error || 'Error');
  }
};

export const post = async (path: String, data: any) => {
  try {
    const response = await axios.post(`${baseUrl}${path}`, data, { headers: headers });
    return response;
  } catch (error: any) {
    console.error('Error ', error)
    throw new Error(error.response?.data?.error?.message || error || 'Error');
  }
};

export const patch = async (path: String, data: any) => {
  try {
    const response = await axios.patch(`${baseUrl}${path}`, data, { headers: headers });
    return response;
  } catch (error: any) {
    console.error('Error ', error)
    throw new Error(error.response?.data?.error?.message || error || 'Error');
  }
};

export const put = async (path: String, data: any) => {
  try {
    const response = await axios.put(`${baseUrl}${path}`, data, { headers: headers });
    return response;
  } catch (error: any) {
    console.error('Error ', error)
    throw new Error(error.response?.data?.error?.message || error || 'Error');
  }
};

export const _delete = async (path: String) => {
  try {
    const response = await axios.delete(`${baseUrl}${path}`, { headers: headers });
    return response;
  } catch (error: any) {
    console.error('Error ', error)
    throw new Error(error.response?.data?.error?.message || error || 'Error');
  }
};
