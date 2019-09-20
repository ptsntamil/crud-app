import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CrudTable from './views/CrudTable.vue';
import Error from './views/Error.vue';
import CrudForm from './views/CrudForm.vue';
import Login from './views/Login.vue';
import Store from './store';

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
      path: '*',
      component: Error
    }
  ]
});
router.beforeEach((to, from, next) => {
  if(!Store.state.authenticated) {
    const loggedUser = Store.getters.getUserByUsername(localStorage.getItem('loggedUser'));
    if(loggedUser) {
      Store.dispatch('authenticate', true);
    } else {
      localStorage.setItem('loggedUser', "");
      Store.dispatch('authenticate', false);
    }
  }
  if(to.meta.priavte) {
    if(Store.state.authenticated) {
      next();
    } else if(to.path !== "/"){
      next({
        path: '/'
      });
    } else if(to.path === '/') {
      if(Store.state.authenticated) {
        next({path:'/users'})
        return;
      } 
      next();
    }
  } else {
    next();
  }
	
});
export default router;
