let crudTable = {
	computed: {
		users: function() {
			return this.$store.state.users;
		},
		gridObj: function() {
			return this.$store.state.gridObj;
		}
	},
	methods:{
		deleteUser: function(index) {
			this.$store.dispatch('deleteUser', index);
		}
	},
	template:`<section class="mt-5">
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
								<tr v-for="(user, index) in users">
									<td v-for="(obj, idx) in gridObj" :key="idx">{{user[obj.key]}}</td>
									<td><router-link :to="'/user/' + user.id">Edit</router-link></td>
									<td><a href="#" v-on:click.prevent="deleteUser(index)">Delete</a></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</section>`
};