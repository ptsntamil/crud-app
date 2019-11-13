const state = {
  gridObj: [{
    key:"id",
    header: "#"
  },{
    key:"title",
    header: "Title"
  },{
    key:"description",
    header: "Description"
  },{
    key: "createdDate",
    header: "Created Date",
    type: "date"
  }],
  gridData: {
    data: [{
      id:1,
      title: 'Task1',
      description: "Tas1",
      createdDate: "2019-10-19T12:45:34"
    }, {
      id:3,
      title: 'Task2',
      description: "Task2",
      createdDate: "2019-10-19T12:45:34"
    }, {
      id:3,
      title: 'Task3',
      description: "Task3",
      createdDate: "2019-10-19T12:45:34"
    }],
    total:3,
    per_page:6,
    page:1
  }
};

const getters = {
  gridObj(state) {
    return state.gridObj;
  },
  gridData(state) {
    return state.gridData;
  }
};

const mutations = {};
const actions = {};

export default {
  getters,
  state,
  mutations,
  actions,
  namespaced: true,
};