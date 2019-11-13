<template>
  <div class="dashboard">
    <div class="row mt-4 task">
      <div class="col-4">
        <div class="bg-success card text-white border-success shadow-sm">
          <div class="card-body">
            <span class="count">{{completedTasks}}</span>
            <div class="overflow-ellipsis">Completed Tasks</div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="bg-primary card text-white border-primary shadow-sm">
          <div class="card-body">
            <span class="count">{{totalTasks}}</span>
            <div class="overflow-ellipsis">Total Tasks</div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="bg-info card text-white border-info shadow-sm">
          <div class="card-body">
            <span class="count">{{tasklistCount}}</span>
            <div class="overflow-ellipsis">Task Group</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-12">
        <h3>Recents</h3>
        <div class="recents">
          <Todo v-for="task in tasks" :task="task" v-bind:key="task.id"></Todo>
          <!-- <div v-for="task in tasks" v-bind:key="task.id" class="card mt-2" v-bind:style="{'border-left-color':task.color}">
            <div class="card-body">
              <h5 class="card-title">{{task.title}}</h5>
              <h6 class="card-subtitle text-muted mb-2">Modified By {{task.createdBy}}</h6>
              <div class="card-text overflow-ellipsis">{{task.description}}</div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Todo from '../Todo/component/Todo.vue'
export default {
  name: "Dashboard",
  components: {
    'Todo': Todo
  },
  data() {
    return {
      completedTasks: 6,
      totalTasks: 17,
      tasklistCount:5,
      tasks: [{
        id: 1,
        title: 'TODO APP - Design',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
        createdBy: "Tamilarasan",
        color: '#8c6664',
        modifiedTime: '2019-10-15T19:10:17+05:30'
      },{
        id: 2,
        title: 'TODO APP - UI',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
        createdBy: "Tamilarasan",
        color: '#0d2b8f',
        modifiedTime: '2019-10-15T15:42:17+05:30'
      },{
        id: 3,
        title: 'TODO APP - Vue',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
        createdBy: "Tamilarasan",
        color: '#7b3096',
        modifiedTime: '2019-10-14T00:42:17+05:30'
      },{
        id: 4,
        title: 'TODO APP - Backend',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`,
        createdBy: "Tamilarasan",
        color: '#f28305',
        modifiedTime: '2019-10-13T12:42:17+05:30'
      }]
    }
  }
}
</script>