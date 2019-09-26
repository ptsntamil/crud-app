import axios from 'axios';
import Store from './store';
import {constant} from './constants';

const config = {
  baseURL: 'https://reqres.in/'
};

const httpClient = axios.create(config);

const authInterceptor = config => {
  /** TODO: Add auth token */
  return config;
};

const loggerInterceptor = config => {
  /** TODO */
  Store.dispatch(constant.SET_LOADING, true);
  return config;
};

/** Adding the request interceptors */
httpClient.interceptors.request.use(authInterceptor);
httpClient.interceptors.request.use(loggerInterceptor);

/** Adding the response interceptors */
httpClient.interceptors.response.use(
  response => {
    Store.dispatch(constant.SET_LOADING, false);
    /** TODO: Add any response interceptors */
    return response;
  },
  error => {
    /** TODO: Do something with response error */
    Store.dispatch(constant.SET_LOADING, false);
    return Promise.reject(error);
  }
);

export { httpClient };