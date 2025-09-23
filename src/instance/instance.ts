import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://nikestore-api.onrender.com/api',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});