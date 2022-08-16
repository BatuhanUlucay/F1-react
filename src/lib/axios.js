import Axios from 'axios';
import { API_URL, API_KEY, API_HOST } from '../config';

function requestInterceptor(config) {
  config.headers.Accept = 'application/json';
  return config;
}

console.log('keyy', API_KEY);

export const axios = Axios.create({
  baseURL: API_URL,
  headers: { 'x-rapidapi-key': API_KEY, 'x-rapidapi-host': API_HOST },
});

axios.interceptors.request.use(requestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;

    return Promise.reject(error);
  }
);
