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
    gridData: {
      data:[],
      per_page:0,
      page:0,
      total_pages:0,
      total:0
    },
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
    getCurrentUser(state) {
      return state.currentUser;
    },
    getGridData(state) {
      return state.gridData;
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
        context.commit(constant.SET_LOGIN_ERROR, error.response.data); 
        return; 
      });
      if(result) {
        context.dispatch(constant.SET_AUTH, result.data);
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
