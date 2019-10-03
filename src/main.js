import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import CrudForm from './views/CrudForm.vue';
import CrudTable from './views/CrudTable.vue';
import Error from './views/Error.vue';
import Login from './views/Login.vue';
import Modal from './components/Modal.vue';
import ChangePassword from './components/ChangePassword.vue';

//import 
//import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import './assets/style.css';
Vue.config.productionTip = false

new Vue({
  router,
  store,
	components :{
    CrudForm,
    Error,
    CrudTable,
    Login,
    Modal,
    ChangePassword
  },
  render: h => h(App)
}).$mount('#app')
