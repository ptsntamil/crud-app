<template>
  <div class="card mt-2" v-bind:style="{'border-left-color': task.color}">
    <div class="card-body">
      <h5 class="card-title">{{task.title}}</h5>
      <h6 class="card-subtitle text-muted mb-2">Modified By {{task.createdBy}} <span class="float-right">{{findDiff}}</span></h6>
      <div class="card-text overflow-ellipsis">{{task.description}}</div>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  export default {
    name: 'Todo',
    props: [ 'task' ],
    computed: {
      findDiff() {
        return  moment(this.task.modifiedTime, 'YYYY-MM-DDThh:mm:ss').fromNow();
      }
    }
  }
</script>