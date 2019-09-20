<template>
  <transition name="modal" enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp" appear>
    <div v-if="show" class="modal d-block" role="dialog" key="1">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <slot name="header">Modal title</slot>
            </h5>
            <button type="button" class="close" aria-label="Close" v-on:click="$emit('update:show', false)">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" v-on:click="$emit('update:show', false)">
              <slot name="cancel">Close</slot>
            </button>
            <button type="button" class="btn btn-primary" v-on:click="$emit('success')">
              <slot name="success">Save changes</slot>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Modal',
  props: ['show']
}
</script>