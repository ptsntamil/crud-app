<template>
  <div class="row">
    <div class="col-6 offset-3">
      <h2 class="text-info">Login</h2>
      <form v-on:submit.prevent="login" novalidate="true">
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="user.email" class="form-control" :class="{'border-danger':error.email}" placeholder="email" required/>
          <span class="text-danger">{{error.email}}</span>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="user.password" class="form-control" placeholder="Password" :class="{'border-danger':error.password}" required/>
          <span class="text-danger">{{error.password}}</span>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
        <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <div v-if="error.error" class="text-danger mt-2">{{error.error}}</div>
        </transition>
      </form>
    </div>
  </div>
</template>
<script>
  import { constant } from '@/constants';
	export default {
		name: 'login',
		data: function() {
			return {
				user: {
					email: "",
					password: ""
				},
				error:{ 
					email: "",
					password: "",
					error: ""
				}
			};
    },
    created() {
      this.$store.subscribe((mutation, state) => {
        switch(mutation.type) {
          case constant.SET_AUTH: 
            this.moveToUsers();
            break;
          case constant.SET_LOGIN_ERROR: 
            this.error.error = state.loginError;
            break;
        }
      });
    },
    methods: {
      login() {
        if(this.validateForm()) {
          this.$store.dispatch('login', this.user);
        }
      },
      moveToUsers() {
        localStorage.setItem('authToken', this.$store.getters.getAuthToken);
        this.$router.push('/users');
      },
      validateForm() {
        if(!this.user.email) {
          this.error.email = "Email is Required";
        } else {
          this.error.email = "";
        }
        if(!this.user.password) {
          this.error.password = "Password is Required";
        } else {
          this.error.password = "";
        }
        if(this.user.email && this.user.password) {
          return true;
        }
      }
    }
	}
</script>