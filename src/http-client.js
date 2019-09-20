import axios from 'axios';

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
  return config;
};

/** Adding the request interceptors */
httpClient.interceptors.request.use(authInterceptor);
httpClient.interceptors.request.use(loggerInterceptor);

/** Adding the response interceptors */
httpClient.interceptors.response.use(
  response => {
    /** TODO: Add any response interceptors */
    return response;
  },
  error => {
    /** TODO: Do something with response error */
    return Promise.reject(error);
  }
);

export { httpClient };