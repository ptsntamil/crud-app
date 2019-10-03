<template>
  <div id="app" class="container position-relative">
    <header>
      <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand" href="#">CRUD app</a>
        <button type="button" v-if="authenticated" v-on:click="logout" class="btn btn-warning">Logout</button>
      </nav>
    </header>
    <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" appear mode="out-in" :duration="300">
      <router-view></router-view>
    </transition>
    <Loader :active="isLoading" ></Loader>
  </div>
</template>
<script>
  import {constant} from './constants';
  import { mapGetters } from 'vuex';
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  import Loader from '@/components/Loader.vue';
  
  export default {
    name: 'App',
    computed: {
      ...mapGetters(['fullPage', 'isLoading']),
      authenticated() {
        return this.$store.getters.getAuthToken;
      }
    },
    components: {
      Loader
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
