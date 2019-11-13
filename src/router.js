import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CrudTable from './views/CrudTable.vue';
//import Error from './views/Error.vue';
import CrudForm from './views/CrudForm.vue';
import Login from './views/Login.vue';
import Store from './store';
import { constant } from './constants';
import Dashboard from './views/Dashboard.vue';
import TaskGrid from './Todo/views/TaskGrid.vue';


Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:"/",
      name: 'login',
      component: Login
    },{
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },{
      path: '/users', 
      component: CrudTable,
      meta: {
        priavte: true
      }
    },{
      path: '/create', 
      component: CrudForm,
      meta: {
        priavte: true
      }
    },{
      path: '/user/:id',
      component: CrudForm,
      meta: {
        priavte: true
      }
    },{
      path:"/dashboard",
      component: Dashboard,
      meta: {
        priavte: true
      }
    },{
      path:"/tasks",
      component: TaskGrid,
      meta: {
        priavte: true
      }
    },{
      path: '*',
      name:"NotFound",
      component: Error
    }
  ]
});
router.beforeResolve( (to, from , next) => {
  Store.dispatch(constant.SET_LOADING, true);
  next();
});
router.afterEach( () => {
  Store.dispatch(constant.SET_LOADING, false);
});
router.beforeEach(function(to, from, next) {
  if(!Store.getters.getAuthToken) {
    const authToken = localStorage.getItem('authToken');
    if(authToken && authToken !== "undefined") {
      Store.dispatch(constant.SET_AUTH, {token:authToken});
    }
  }
  if(to.meta.priavte) {
    if(Store.getters.getAuthToken) {
      next();
    } else if(to.path !== "/") {
      next({
        path: '/'
      });
    }
  } else if(to.name === 'login' && Store.getters.getAuthToken) {
    next({path:'/users'})
  } else {
    next();
  }
});
export default router;
