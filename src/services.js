import {httpClient} from './http-client';

async function getUsers(page) {
    return await httpClient.get(`api/users?page=${page}`);
};
async function getUserById(id) {
    return await httpClient.get(`api/users/${id}`);
};

export {getUsers,getUserById};