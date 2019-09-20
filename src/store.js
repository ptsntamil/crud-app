import Vue from 'vue'
import Vuex from 'vuex'

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
      key:"username",
      header: "Username"
    }],
    users:[{
      id:1,
      username:"ptsntamil",
      email:"ptsntamil@gmail.com",
      password: "tamiltamil"
    },{
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
    }],
    authenticated: false,
    nxtUserId:10
  },
  getters: {
    getUserById: (state) => (id) => {
      return state.users.find(user => user.id === id);
    },
    getUserByUsername: state => username => {
      return state.users.find(user => user.username === username);
    },
    isAuthenticated: state => {
      return state.authenticated;
    },
    totalUsers: (state) => {
      return state.users.length;
    },
    getUsersForGrid: state => param => {
      return state.users.slice(param.from, param.to);
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
    }
  }
})
