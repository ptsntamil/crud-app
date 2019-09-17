let crudForm = {
	props: {
		currentuser: Object
	},
	data: function() {
		return {
			error: {username:"",email:""}
		}
	},
	methods: {
		validateForm: function() {
			if(!this.currentuser.username) {
				this.error.username = "Username is required";
			} else {
				this.error.username = "";
			}
			if(!this.currentuser.email) {
				this.error.email = "Email is required";
			} else if(!this.validateEmail(this.currentuser.email)) {
				this.error.email = "Invalid Email";
			} else {
				this.error.email = "";
			}
			console.log(this.error);
			if(Object.keys(this.error).length === 0 && this.error.constructor === Object) {
				return true;
			}
		},
		validateEmail: function(email) {
			let emailMatch = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return emailMatch.test(email);
		}
	},
	computed: {
		isFormError: function() {
			console.log(this.error)
			if(!this.error.username && !this.error.email) {
				return true;
			}
			return false;
		}
	},
	template: `<section class="mt-3">
	<div class="row">
		<div class="col-12">
				<form v-on:submit.prevent="$emit('addorupdateuser')" novalidate="true">
					<div class="form-group">
						<label>Email address</label>
						<input type="email" v-model="currentuser.email" class="form-control" :class="{'border-danger':error.email}" placeholder="Enter email" required/>
						<span class="text-danger">{{error.email}}</span>
					</div>
					<div class="form-group">
						<label>Username</label>
						<input type="text" v-model="currentuser.username" class="form-control" placeholder="Username" :class="{'border-danger':error.username}" required/>
						<span class="text-danger">{{error.username}}</span>
					</div>
					<button type="submit" class="btn btn-primary">{{currentuser.id ? 'Update' : 'Submit' }}</button>
				</form>
		</div>
	</div>
</section>`
};

let crudTable = {
	props: {
		gridobj: Array,
		users: Array
	},
	template:`<section class="mt-5">
		<div class="row">
			<div class="col-12">
				<div class="card">
					<div class="card-body">
						<table class="table">
							<thead class="thead-dark">
								<th v-for="(obj, idx) in gridobj" :key="idx">{{obj.header}}</th>
								<th>Edit</th>
								<th>Delete</th>
							</thead>
							<tbody>
								<tr v-for="(user, index) in users">
									<td v-for="(obj, idx) in gridobj" :key="idx">{{user[obj.key]}}</td>
									<td><a href="#" v-on:click.prevent="$emit('update:currentuser', user)">Edit</a></td>
									<td><a href="#" v-on:click.prevent="users.splice(index, 1)">Delete</a></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</section>`
};

// const routes = [{path:'/users', component:crudTable,props: true }];
// const router = new VueRouter({routes});
// const store = new Vuex.Store({
// 	state: {
// 	  count: 0
// 	},
// 	mutations: {
// 	  increment (state) {
// 		state.count++
// 	  }
// 	}
//   })
let app = new Vue({
	router,
	el: "#app",
	components :{
		'crud-form': crudForm,
		'crud-table': crudTable
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
	methods: {
		addorUpdateUser: function() {
			console.log(this.currentUser)
			if(this.currentUser.id) {
				this.updateUser(this.currentUser);
			} else {
				this.users.push({...this.currentUser, ...{ id:this.nxtUserId++ }});
			}
			this.currentUser = {};
		},
		updateUser: function(user) {
			this.users.some((itr, idx)=>{
				if(itr.id === user.id) {
					this.users[idx] = user;
				}
			});
		}
	}
});