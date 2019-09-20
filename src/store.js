import Vue from 'vue'
import Vuex from 'vuex'
import {getUsers, getUserById } from './services';

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
    }/*,{
      id:2,
      username:"two",
      email:"two@gmail.com",
      password: "two"
    },{
      id:3,
      username:"three",
      email:"three@gmail.com",
      password: "three"
    },{
      id:4,
      username:"four",
      email:"four@gmail.com",
      password: "four"
    },{
      id:5,
      username:"five",
      email:"five@gmail.com",
      password: "five"
    },{
      id:6,
      username:"six",
      email:"six@gmail.com",
      password: "six"
    },{
      id:7,
      username:"seven",
      email:"seven@gmail.com",
      password: "seven"
    },{
      id:8,
      username:"eight",
      email:"eight@gmail.com",
      password: "eight"
    },{
      id:9,
      username:"nine",
      email:"nine@gmail.com",
      password: "nine"
    }*/],
    authenticated: false,
    nxtUserId:10,
    gridData: {},
    currentUser: {
      id:"",
      email: "",
      first_name: "",
      last_name:""
    }
  },
  mutations: {
    setUsers(state, data) {
      state.gridData = data;
    },
    setCurrentUser(state, data) {
      state.currentUser = data;
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
    }
  }
})
