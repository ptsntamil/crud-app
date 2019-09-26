<template>
	<section class="mt-3">
		<div class="row">
			<div class="col-12">
				<ChangePassword v-if="currentUser.id" :password.sync="currentUser.password" @success="addUser"></ChangePassword>
				<form v-on:submit.prevent="validateForm" novalidate="true">
					<div class="form-group">
						<label>Email address</label>
						<input type="email" v-model="currentUser.email" class="form-control" :class="{'border-danger':error.email}" placeholder="Enter email" required/>
						<span class="text-danger">{{error.email}}</span>
					</div>
					<div class="form-group">
						<label>First Name</label>
						<input type="text" v-model="currentUser.first_name" class="form-control" placeholder="First Name" :class="{'border-danger':error.first_name}" required/>
						<span class="text-danger">{{error.first_name}}</span>
					</div>
					<button type="submit" class="btn btn-primary">{{currentUser.id ? 'Update' : 'Submit' }}</button>
					<router-link class="btn btn-light" to="/users">Cancel</router-link>
				</form>
			</div>
		</div>
	</section>
</template>

<script>
	import ChangePassword from '@/components/ChangePassword.vue';
	import {ACTIONS, constant} from '@/constants';
  export default {
    name:'CrudForm',
		data: function() {
			return {
				currentUser: {
					first_name:"",
					email:"",
					password: ""
				},
				error: {
					first_name:"",
					email:"",
					error: ""
				},
				showmodal: false
			}
		},
		components: {
			ChangePassword
    },
    created() {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'setCurrentUser') {
          this.currentUser = state.currentUser;
        } else if(mutation.type === constant.FORM_ERROR) {
					this.error.error = state.formError;
					if(state.formError === 'success') {
						this.moveToUsers();
					}
				}
      });
    },
		mounted() {
			if(this.$route.params.id) {
        this.$store.dispatch('getUserById', +this.$route.params.id);
			}
		},
		destroyed() {

		},
		methods: {
			validateForm: function() {
				if(!this.currentUser.first_name) {
					this.error.first_name = "First Name is required";
				} else {
					this.error.first_name = "";
				}
				if(!this.currentUser.email) {
				this.error.email = "Email is required";
				} else if(!this.validateEmail(this.currentUser.email)) {
					this.error.email = "Invalid Email";
				} else {
					this.error.email = "";
				}
				if(!this.error.first_name && !this.error.email) {
					this.$store.dispatch(ACTIONS.CREATE_OR_UPDATE_USER, this.currentUser);
				}
			},
			moveToUsers() {
				this.$router.push({ path: '/users' });
			},
			validateEmail: function(email) {
				let emailMatch = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return emailMatch.test(email);
			},
			addUser: function() {
				this.$store.dispatch('addorUpdateUser', {
					user:this.currentUser
				});
			}
		},
		computed: {
			isFormError: function() {
				if(!this.error.first_name && !this.error.email) {
					return true;
				}
				return false;
			}
		},
  }
</script>