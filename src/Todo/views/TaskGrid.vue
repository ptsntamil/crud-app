<template>
  <Grid :gridData="gridData" :gridObj="gridObj" dateFormat="DD-MMM-YYYY hh:mm">
      <!-- <template v-slot:actionHeader>
        <th>Actions</th>
      </template>
      <td slot="action-data" slot-scope="data">
        <router-link :to="'/user/' + data.data.id">Edit</router-link>
        <a href="#" v-on:click.prevent="deleteUser(data.data.id)">Delete</a>
      </td> -->
    </Grid>
</template>

<script>
import { mapGetters } from 'vuex';
import GridVue from '../../components/Grid.vue';
export default {
  name: 'TaskGrid',
  components: {
    'Grid': GridVue
  },
  computed: {
    ...mapGetters('todo', {
      gridObj: 'gridObj',
      gridData: 'gridData'
    })
  }
}
</script>