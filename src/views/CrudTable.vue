<template>
  <section class="mt-5">
		<div class="row">
			<div class="col-12">
				<div class="card">
					<div class="card-body">
						<div class="row">
							<div class="col-12 text-right">
								<router-link class="btn btn-primary mb-2" to="/create">Create</router-link>
							</div>
						</div>
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
            <div class="row"> 
						  <div class="col-6">
							  Showing {{gridData.per_page * (gridData.page-1) +1 }} to {{gridData.per_page * gridData.page}} of {{gridData.total}}
						  </div>
              <div class="col-6 text-right">
							  <button class="btn btn-light" type="button" :disabled="page <= 1" v-on:click="prev">Prev</button>
                <button class="btn btn-light" :disabled="page >= gridData.total_pages" type="button" v-on:click="next">Next</button>  
						  </div>
            </div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
export default {
  name: 'CrudTable',
  data: function() {
    return {
      page: 1
    };
  },
  computed: {
    gridData() {
      return this.$store.getters.getGridData;
    },
		gridObj() {
			return this.$store.state.gridObj;
		}
  },
  mounted() {
    this.$store.dispatch('getAsyncUsers', {page:this.page});
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
    }
	}
}
</script>