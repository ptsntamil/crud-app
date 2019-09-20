<template>
  <div id="app" class="container">
    <header>
      <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand" href="#">CRUD app</a>
        {{authenticated}}
        <button type="button" v-if="authenticated" v-on:click="logout" class="btn btn-warning">Logout</button>
      </nav>
    </header>
    <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" appear mode="out-in" :duration="300">
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
  export default {
    name: 'App',
	  computed: {
		  authenticated: function() {
			  return this.$store.getters.isAuthenticated;
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
			  this.$router.push({path: '/'})
		  }
  	}
  }
</script>
