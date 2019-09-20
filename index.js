const store = new Vuex.Store({
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
	}],
	authenticated: false,
	nxtUserId:2
  },
  getters: {
	getUserById: (state) => (id) => {
		return state.users.find(user => user.id === id);
	},
	getUserByUsername: state => username => {
		return state.users.find(user => user.username === username);
	},
	isAuthenticated: state => id => {
		return state.authenticated;
	}
  },
  mutations: {
    incrementNxtUser (state) {
      state.nxtUserId++
	},
	
  },
  actions: {
	async addorUpdateUser({commit, state, dispatch}, payload) {
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
  },
});

let app = new Vue({
	router,
	store,
	el: "#app",
	components :{
		'crud-form': crudForm,
		'crud-table': crudTable,
		'login': loginCom,
		'crud-modal': modalComponent,
		'change-password': changePassword
	},
	data:{
		users:[{
			id:1,
			username:"ptsntamil",
			email:"ptsntamil@gmail.com"
		}],
		nxtUserId:2,
		currentUser: {},
		gridObj: [{
			key:"id",
			header: "#"
		},{
			key:"email",
			header: "Email"
		},{
			key:"username",
			header: "Username"
		}]
	},
	beforeCreate: function() {
		console.log('before create');
	},
	// created: function() {
	// 	const loggedUser = this.$store.getters.getUserByUsername(localStorage.getItem('loggedUser'));
	// 	if(loggedUser) {
	// 		this.$store.dispatch('authenticate', true);
	// 	} else {
	// 		localStorage.setItem('loggedUser', "");
	// 		this.$store.dispatch('authenticate', false);
	// 	}
	// },
	computed: {
		authenticated: function() {
			return this.$store.getters.isAuthenticated();
		}
	},
	watch: {
		showLogout: function(value) {
			console.log('showLogout', value);
		}
	},
	methods: {
		logout: function() {
			localStorage.setItem('loggedUser', "");
			this.$store.dispatch('authenticate', false);
			router.push({path: '/'})
		}
	}
});