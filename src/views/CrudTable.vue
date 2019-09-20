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
								<tr v-for="(user, index) in getUsersForGrid" :key="index">
									<td v-for="(obj, idx) in gridObj" :key="idx">{{user[obj.key]}}</td>
									<td><router-link :to="'/user/' + user.id">Edit</router-link></td>
									<td><a href="#" v-on:click.prevent="deleteUser(index)">Delete</a></td>
								</tr>
							</tbody>
						</table>
            <div class="row"> 
						  <div class="col-6">
							  Showing {{from + 1}} to {{to}} of {{total}}
						  </div>
              <div class="col-6 text-right">
							  <button class="btn btn-light" type="button" :disabled="from < 1" v-on:click="prev">Prev</button>
                <button class="btn btn-light" :disabled="(from+length) >= total" type="button" v-on:click="next">Next</button>  
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
      from: 0,
      page: 1,
      length: 5
    };
  },
  computed: {
		users: function() {
			return this.$store.state.users;
		},
		gridObj: function() {
			return this.$store.state.gridObj;
		},
    total: function() {
      return this.$store.getters.totalUsers;
    },
    to: function() {
      const to = this.page * this.length;
      return this.total < to ? this.total : to;
    },
    getUsersForGrid: function() {
      console.log(this.from,this.length);
      this.from = ( this.length * this.page ) - this.length;
      return this.$store.getters.getUsersForGrid({
        from: this.from,
        to: this.length * this.page
      });
    }
	},
  watch: {
    page: function(value) {
      console.log('page', value);
    }
  },
	methods:{
		deleteUser: function(index) {
			this.$store.dispatch('deleteUser', index);
		},
    next: function() {
      this.page +=1;
    },
    prev: function() {
      this.page -= 1;
    }
	}
}
</script>