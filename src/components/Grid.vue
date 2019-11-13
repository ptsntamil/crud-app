<!-- 
  Input structure For Grid
  gridData
  {
    data:[{}, {}],
    per_page: 3,
    total: 50,
    page: 1    
  }
  gridObj
  [{
    title: //Column Header
    key: //Column Key
    type: //Type of Data
  }]
  dateFormat //if grid has date column, date format of that column  
-->
<template>
  <section class="mt-5">
    <div class="row">
      <div class="col-12">
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
                  <th v-for="(obj, idx) in gridObj" :key="idx">
                    <div class="d-flex flex-row align-items-center">
                      <div class="text">{{obj.header}}</div>
                      <div class="actions" @click="sort(obj.key)" v-bind:class="{'active': obj.key === sortKey, 'asc': sortOrder === 'asc', 'desc': sortOrder === 'desc'}">
                        <div class="asc">
                          <img src="icons/arrow-up.svg" alt="arrow-up"/>
                        </div>
                        <div class="desc">
                          <img src="icons/arrow-down.svg" alt="arrow-down"/>
                        </div>
                      </div>
                    </div>
                  </th>
                  <slot v-if="hasAction" name="actionHeader"></slot>
                </thead>
                <tbody>
                  <tr v-for="(data, index) in gridData.data" :key="index">
                    <td v-for="(obj, idx) in gridObj" :key="idx">
                      {{ obj.type && obj.type === "date" ? formatDate(data[obj.key], dateFormat) : data[obj.key] }}
                    </td>
                    <slot v-if="hasAction" name="action-data" :data="data"></slot>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row mt-2"> 
              <div class="col-6">
                Showing {{ pageStartCount }} to {{ currentPageCount }} of {{ gridData.total }}
              </div>
              <div class="col-6 text-right">
                <button class="btn btn-light mr-2" type="button" :disabled="pageStartCount <= gridData.per_page" v-on:click="$emit('prev')">Prev</button>
                <button class="btn btn-light" :disabled="currentPageCount >= gridData.total" type="button" v-on:click="$emit('next')">Next</button>  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import moment from "moment";
export default {
  name: 'Grid',
  props: ['gridData', 'gridObj', 'dateFormat'],
  data: function() {
    return {
      search: "",
      sortOrder: "",
      sortKey: ""
    };
  },
  computed: {
    pageStartCount() {
      return this.gridData.data.length > 0 ? this.gridData.per_page * ( this.gridData.page - 1 ) + 1 : 0;
    },
    currentPageCount() {
      return (this.gridData.total < (this.gridData.per_page * this.gridData.page)) ? this.gridData.total : this.gridData.per_page * this.gridData.page;
    },
    hasAction() {
      return !!this.$slots['actionHeader'];
    },
    formatDate() {
      return date => moment(date).format(this.dateFormat);
    }
  },
  methods: {
    sort(key) {
      if(this.sortKey && this.sortKey !== key) {
        this.sortOrder = '';
      }
      switch(this.sortOrder) {
        case 'asc': 
          this.sortKey = key; 
          this.sortOrder = 'desc';
          break;
        case 'desc':
          this.sortKey = ''; 
          this.sortOrder = '';
          break;
        default:
          this.sortKey = key; 
          this.sortOrder = 'asc';
      }
      this.$emit('sort', {column:this.sortKey, order:this.sortOrder});
    }
  }
}
</script>