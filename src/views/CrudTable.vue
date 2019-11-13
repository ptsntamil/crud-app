<template>
  <!-- <section class="mt-5">
    <div class="row"> -->
      <!-- <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12 text-right">
                <input type="text" v-model="search" class="form-control w-50 mr-2 d-inline" />
                <router-link class="btn btn-primary mb-2" to="/create">Create</router-link>
              </div>
            </div>
            <div class="overflow-auto">
              <table class="table">
                <thead class="thead-dark">
                  <th v-for="(obj, idx) in gridObj" :key="idx">{{obj.header}}</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in gridData.data" :key="index">
                    <td v-for="(obj, idx) in gridObj" :key="idx">{{user[obj.key]}}</td>
                    <td><router-link :to="'/user/' + user.id">Edit</router-link></td>
                    <td><a href="#" v-on:click.prevent="deleteUser(index)">Delete</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row mt-2"> 
              <div class="col-6">
                Showing {{pageStartCount }} to {{currentPageCount}} of {{gridData.total}}
              </div>
              <div class="col-6 text-right">
                <button class="btn btn-light mr-2" type="button" :disabled="page <= 1" v-on:click="prev">Prev</button>
                <button class="btn btn-light" :disabled="page >= gridData.total_pages" type="button" v-on:click="next">Next</button>  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <Grid :gridData="gridData" :gridObj="gridObj" @next="next" @prev="prev" @sort="sort">
      <template v-slot:actionHeader>
        <th>Actions</th>
      </template>
      <td slot="action-data" slot-scope="data">
        <router-link :to="'/user/' + data.data.id">Edit</router-link>
        <a href="#" v-on:click.prevent="deleteUser(data.data.id)">Delete</a>
      </td>
    </Grid>
  <!-- </section> -->
</template>
<script>
import GridVue from '../components/Grid.vue';

export default {
  name: 'CrudTable',
  components: {
    'Grid': GridVue
  },
  data: function() {
    return {
      page: 1,
      search:""
    };
  },
  computed: {
    gridData() {
      return this.$store.getters.getGridData(this.search);
    },
    gridObj() {
      return this.$store.state.gridObj;
    }
  },
  mounted() {
    this.$store.dispatch('getAsyncUsers', {page:this.page});
  },
  destroyed() {
    this.$store.dispatch("setGridData");
  },
  methods:{
    deleteUser: function(index) {
      this.$store.dispatch('deleteUser', index);
    },
    next: function() {
      this.page +=1;
      this.$store.dispatch('getAsyncUsers', {page:this.page});
    },
    prev: function() {
      this.page -= 1;
      this.$store.dispatch('getAsyncUsers', {page:this.page});
    },
    sort: function(param) {
      console.log(param);
    }
  }
}
</script>