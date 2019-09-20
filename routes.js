const routes = [{
	path: '/users', 
	component: crudTable,
	meta: {
		priavte: true
	}
}, {
	path: '/create', 
	component: crudForm,
	meta: {
		priavte: true
	}
}, {
	path: '/user/:id',
	component: crudForm,
	meta: {
		priavte: true
	}
}, {
    path:"/",
    component: loginCom
}, {
    path: '*',
    component: errorComp
}];

const router = new VueRouter({routes});
//export default router;
router.beforeEach(function(to, from, next) {
	console.log('TOOO', to);
	console.log('FROM', from);
	if(to.meta.priavte && store.state.authenticated) {
		next();
	} else if(to.path !== "/"){
		next({
			path: '/'
		});
	} else if(to.path === '/') {
		const loggedUser = store.getters.getUserByUsername(localStorage.getItem('loggedUser'));
		if(loggedUser) {
			store.dispatch('authenticate', true);
		} else {
			localStorage.setItem('loggedUser', "");
			store.dispatch('authenticate', false);
		}
		if(store.state.authenticated) {
			next({path:'/users'})
			return;
		} 
		next();
	}
	// const authenticated = store.state.user.authenticated
	// const onlyLoggedOut = to.matched.some(record => record.meta.onlyLoggedOut)
	// const isPublic = to.matched.some(record => record.meta.public)
	// if (!isPublic && !authenticated) {
	//   // this route requires auth, check if logged in
	//   // if not, redirect to login page.
	//   return next({
	// 	path: '/login',
	// 	query: { redirect: to.fullPath }
	//   })
	// }
	// if (authenticated && onlyLoggedOut) {
	//   return next('/')
	// }
	//next()
  })