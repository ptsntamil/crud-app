import {httpClient} from './http-client';
import store from './store';

async function getUsers(page) {
  return await httpClient.get(`api/users?page=${page}`);
};
async function getUserById(id) {
  return await httpClient.get(`api/users/${id}`);
};
async function authenticateLogin(credentials) {
  return await httpClient.post('api/login', credentials);
}
async function createOrUpdateUser(user, errorMutationType) {
  try {
    if(user.id) {
      return await httpClient.put(`api/users/${user.id}`, user);
    } else {
      return await httpClient.post('api/users', user);
    }
  } catch(error) {
    store.commit(errorMutationType, error.response.data);
  }
}
export {createOrUpdateUser, getUsers,getUserById, authenticateLogin};