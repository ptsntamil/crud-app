let crudForm = {
	data: function() {
		return {
			currentUser: {
				username:"",
				email:"",
				password: ""
			},
			error: {
				username:"",
				email:""
			},
			showmodal: false
		}
	},
	components: {
		'change-password': changePassword
	},
	created: function() {
		if(this.$route.params.id) {
			this.currentUser = this.$store.getters.getUserById(+this.$route.params.id);
		}
	},
	methods: {
		validateForm: function() {
			if(!this.currentUser.username) {
				this.error.username = "Username is required";
			} else {
				this.error.username = "";
			}
			if(!this.currentUser.email) {
				this.error.email = "Email is required";
			} else if(!this.validateEmail(this.currentUser.email)) {
				this.error.email = "Invalid Email";
			} else {
				this.error.email = "";
			}
			if(!this.error.username && !this.error.email) {
				this.addUser();
				router.push({ path: '/users' });
			}
		},
		validateEmail: function(email) {
			let emailMatch = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return emailMatch.test(email);
		},
		addUser: function() {
			console.log(this.currentUser);
			this.$store.dispatch('addorUpdateUser', {
				user:this.currentUser
			});
		}
	},
	watch: {
		showmodal: function(value) {
			console.log(value)
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
			<change-password v-if="currentUser.id" :password.sync="currentUser.password" @success="addUser"></change-password>
			<form v-on:submit.prevent="validateForm" novalidate="true">
				<div class="form-group">
					<label>Email address</label>
					<input type="email" v-model="currentUser.email" class="form-control" :class="{'border-danger':error.email}" placeholder="Enter email" required/>
					<span class="text-danger">{{error.email}}</span>
				</div>
				<div class="form-group">
					<label>Username</label>
					<input type="text" v-model="currentUser.username" class="form-control" placeholder="Username" :class="{'border-danger':error.username}" required/>
					<span class="text-danger">{{error.username}}</span>
				</div>
				<button type="submit" class="btn btn-primary">{{currentUser.id ? 'Update' : 'Submit' }}</button>
				<router-link class="btn btn-light" to="/users">Cancel</router-link>
			</form>
		</div>
	</div>
</section>`
};