<template>
  <div class="row">
    <div class="col-6 offset-3">
      <h2 class="text-info">Login</h2>
      <form v-on:submit.prevent="login" novalidate="true">
        <div class="form-group">
          <label>Username</label>
          <input type="email" v-model="user.username" class="form-control" :class="{'border-danger':error.username}" placeholder="Username" required/>
          <span class="text-danger">{{error.username}}</span>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="user.password" class="form-control" placeholder="Password" :class="{'border-danger':error.password}" required/>
          <span class="text-danger">{{error.password}}</span>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
        <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <div v-if="error.error" class="text-danger">{{error.error}}</div>
        </transition>
      </form>
    </div>
  </div>
</template>
<script>
	export default {
		name: 'login',
		data: function() {
			return {
				user: {
					username: "",
					password: ""
				},
				error:{ 
					username: "",
					password: "",
					error: ""
				}
			};
    },
    methods: {
      login: function() {
        if(this.validateForm()) {
          let dbUser = this.$store.getters.getUserByUsername(this.user.username);
          if(dbUser && dbUser.password === this.user.password) {
            this.$store.dispatch('authenticate', true);
            localStorage.setItem('loggedUser', this.user.username);
            this.$router.push('/users');
            this.error.error = "";
          } else {
            this.error.error = "Invalid username or password";
          }
        }
      },
      validateForm: function() {
        if(!this.user.username) {
          this.error.username = "Username is Required";
        } else {
          this.error.username = "";
        }
        if(!this.user.password) {
          this.error.password = "Password is Required";
        } else {
          this.error.password = "";
        }
        if(this.user.username && this.user.password) {
          return true;
        }
      }
    }
	}
</script>