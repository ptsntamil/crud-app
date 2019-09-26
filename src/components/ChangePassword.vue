<template>
  <div class="row">
    <div class="col-12">
      <div class="text-right">
        <button class="btn btn-info" type="button" v-on:click="show=true">Change Password</button>
      </div>
        <crud-modal :show.sync="show" @success="changePassword">
          <template slot="header">Change Password</template>
          <template slot="body">
            <form v-on:submit.prevent novalidate="true">
              <div class="form-group">
                <label>New Password</label>
                <input type="password" v-model="newPassword" class="form-control" placeholder="Password" required/>
                <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                    <span class="text-danger" v-if="error.newPassword">{{error.newPassword}}</span>
                </transition>
              </div>
              <div class="form-group">
                <label>Retype Password</label>
                <input type="password" v-model="rePassword" class="form-control" placeholder="New Password" required/>
                <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                    <span class="text-danger" v-if="error.rePassword">{{error.rePassword}}</span>
                </transition>
              </div>
              <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="500">
                <span class="text-danger" v-if="error.error">{{error.error}}</span>
              </transition>
            </form>
          </template>
          <template slot="success">Change</template>
          <template slot="cancel"></template>
        </crud-modal>
        <transition name="fade" enter-active-class="animated fade" leave-active-class="animated fadeOut">
          <div v-if="show" class="modal-backdrop show"></div>
        </transition>
      </div>
    </div>
</template>
<script>
  import Modal from '@/components/Modal.vue';
  export default {
    name: 'ChangePassword',
    props: ['password'],
    data: function() {
      return {
        rePassword:"",
        newPassword: "",
        show: false,
        error: {
            rePassword: "",
            newPassword:"",
            error: ""
        }
      };
    },
    methods: {
      changePassword: function() {
        if(this.newPassword && this.rePassword) {
          this.error.newPassword = "";
          this.error.rePassword = "";
          if(this.newPassword === this.rePassword) {
              this.error.error = "";
              this.show = false;
              this.$emit('update:password', this.newPassword);
              this.$emit('success');
          } else {
              this.error.error = "Password and Re-type Password not matched";
          }
          return;
        }
        if(!this.newPassword) {
          this.error.newPassword= "New Password is required"
        }
        if(!this.rePassword) {
          this.error.rePassword= "Re-Type Password is required"
        }
      }
    },
    components: {
      'crud-modal': Modal
    }
  }
</script>