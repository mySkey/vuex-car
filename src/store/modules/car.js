
export default{
  state:{
    list: []
  },
  getters:{
    
  },
  mutations: {
    SAVECAR(state, productor){
      state.list = productor
    }
  },
  actions:{
    addCar({ commit,state }, productor){
      const list = [].concat(state.list)
      productor.checked = true
      list.push(productor)
      commit('SAVECAR', list)
    },
    rmProdutor({ commit, state }, k){
      const list = [].concat(state.list)
      list.splice(k,1)
      commit('SAVECAR', list)
    },
    addStock(){

    },
    checkProductor({ commit,state }, k){
      const list = [].concat(state.list)
      list[k].checked = !list[k].checked
      commit('SAVECAR', list)
    },
    checkAll(){
      const list = [].concat(state.list)
      for (let v of list) {
        v.checked = true;
      }
      commit('SAVECAR', list)
    },
    cancelAll({ commit,state }){
      const list = [].concat(state.list)
      for(let v of list){
        v.checked = false;
      }
      commit('SAVECAR', list)
    }
  }
}