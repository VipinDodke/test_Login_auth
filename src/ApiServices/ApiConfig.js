import axios from 'axios';
import {BaseUrl} from './config';

const parseBody = response => {
  if (response && (response.data === null || response.data === undefined)) {
    return Promise.reject({message: 'Resource Not Found'});
  }
  let exception = true;
  if (response.data && (response.status === 200 || response.status === 201)) {
    exception = false;
  }
  return exception ? response : response?.data;
};

const instance = axios.create({
  baseURL: BaseUrl,
  withCredentials: false,
});

instance.interceptors.request.use(
  config => {
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    const result = parseBody(response);
    return result;
  },
  error => {
    return Promise.reject(error?.response || error); //parsedError(error.response || error);
  },
);

export const api = instance;
