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
		<div>
		<loading :active.sync="isLoading" color="#fc8910" background-color="#8e8c8c" loader="dots" :is-full-page="fullPage"></loading>
		</div>
	</div>
</template>
<script>
	import {constant} from './constants';
	import { mapGetters } from 'vuex';
	import Loading from 'vue-loading-overlay';
	import 'vue-loading-overlay/dist/vue-loading.css';
	
  export default {
		name: 'App',
	  computed: {
			...mapGetters(['fullPage', 'isLoading']),
		  authenticated() {
			  return this.$store.getters.getAuthToken;
		  }
		},
		components: {
			Loading
		},
	  methods: {
      logout() {
        localStorage.setItem('authToken', '');
        this.$store.dispatch(constant.SET_AUTH, "");
        this.$router.push({path: '/'})
		  }
  	}
  }
</script>
