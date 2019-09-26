import Vue from 'vue'
import Vuex from 'vuex'
import {getUsers, getUserById, authenticateLogin, createOrUpdateUser } from './services';
import {constant, ACTIONS} from './constants';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gridObj: [{
      key:"id",
      header: "#"
    },{
      key:"email",
      header: "Email"
    },{
      key:"first_name",
      header: "First Name"
    }],
    users:[{
      id:1,
      username:"ptsntamil",
      email:"ptsntamil@gmail.com",
      password: "tamiltamil"
    }],
    authenticated: false,
    nxtUserId:10,
    gridData: {
      data:[],
      per_page:0,
      page:0,
      total_pages:0,
      total:0
    },
    loggedInUser: {},
    authToken:"",
    currentUser: {
      id:"",
      email: "",
      first_name: "",
      last_name:""
    },
    loginError: "",
    formError: "success",
    fullPage: true,
    isLoading: true
  },
  mutations: {
    setUsers(state, data) {
      state.gridData = data;
    },
    setCurrentUser(state, data) {
      state.currentUser = data;
    },
    [constant.SET_AUTH](state, data) {
      state.authToken = data.token; 
    },
    [constant.SET_LOGIN_ERROR](state, data) {
      state.loginError = data.error; 
    },
    [constant.FORM_ERROR](state, data) {
      state.formError = data.error; 
    },
    [constant.SET_LOADING](state, data) {
      state.isLoading = data; 
    }
  },
  getters: {
    getUserById: (state) => (id) => {
      return state.users.slice(id,1);
    },
    getCurrentUser(state) {
      return state.currentUser;
    },
    getUserByUsername: state => username => {
      return state.users.find(user => user.username === username);
    },
    isAuthenticated: state => {
      return state.authenticated;
    },
    getUsersForGrid: state => param => {
      return state.users.slice(param.from, param.to);
    },
    getGridData(state) {
      return state.gridData;
    },
    getUsers(state) {
      return state.users;
    },
    getAuthToken(state) {
      return state.authToken;
    },
    isLoading(state) {
      return state.isLoading
    },
    fullPage(state) {
      return state.fullPage;
    }
  },
  actions: {
    async addorUpdateUser({state, dispatch}, payload) {
      const {user} = payload;
      if(user.id) {
        await dispatch('updateUser', user);
      } else {
        state.users.push({...user, ...{ id:state.nxtUserId++ }});
      }
    },
    updateUser({state}, user) {
      state.users.some((itr, idx)=>{
        if(itr.id === user.id) {
          state.users[idx] = user;
        }
      });
    },
    deleteUser({state}, index) {
      state.users.splice(index,1);
    },
    authenticate({state}, isAuthenticated) {
      state.authenticated = isAuthenticated;
    },
    async getAsyncUsers(context, param) {
      const result = await getUsers(param.page);
      context.commit('setUsers', result.data);
    },
    async getUserById(context, id) {
      const result = await getUserById(id);
      context.commit('setCurrentUser', result.data.data)
    },
    async setGridData(context) {
      context.commit('setUsers', {
        data:[],
        per_page:0,
        page:0,
        total_pages:0,
        total:0
      });
    },
    async login(context, credentials) {
      const result = await authenticateLogin(credentials).catch(error => {
        console.log(error.response);
        context.commit(constant.SET_LOGIN_ERROR, error.response.data); 
        return; 
      });
      if(result) {
        context.commit(constant.SET_AUTH, result.data);
      }
    },
    async [ACTIONS.CREATE_OR_UPDATE_USER](context, user) {
      const result = await createOrUpdateUser(user, constant.FORM_ERROR);
      if(result) {
        context.commit(constant.FORM_ERROR, {error:"success"});
      }
    },
    [constant.SET_AUTH](context, data) {
      context.commit(constant.SET_AUTH, data);
    },
    [constant.SET_LOADING](context, data) {
      context.commit(constant.SET_LOADING, data);
    }
  }
})
