let getStorage = (key)=>{
  return JSON.parse(localStorage.getItem(key))
}
let setStorage = (key, value)=>{
  localStorage.setItem(key, JSON.stringify(value))
}
export default{
  state:{
    list: getStorage('car') || []
  },
  getters:{
    checkedList(state){
      return state.list.filter(v=>v.checked)
    },
    money(state){
      let money = 0;
      state.list.forEach(v=>{
        if(v.checked) money+=(v.price*v.num)
      })
      return money;
    }
  },
  mutations: {
    SAVECAR(state, list){
      state.list = list
      setStorage('car',list)
    }
  },
  actions:{
    addCar({ commit, state, dispatch }, productor){
      let list = [].concat(state.list)
      productor.checked = true
      if(list.length==0){
        productor.num = 1
        list.push(productor)
        commit('SAVECAR', list)
      }else{
        let some = -1;
        list.forEach((v,k)=>{
          if(v.id == productor.id) some = k 
        })
        if(some>=0){
          //list[some].num++
          dispatch('addNum', some)
        }else{
          productor.num = 1
          list.push(productor)
        }
        commit('SAVECAR', list)
      }
    },
    addNum({ commit, state }, k){
      const list = [].concat(state.list)
      list[k].num++
      commit('SAVECAR', list)
    },
    reduceNum({ commit, state }, k){
      const list = [].concat(state.list)
      list[k].num--
      commit('SAVECAR', list)
    },
    rmProdutor({ commit, state }, k){
      const list = [].concat(state.list)
      list.splice(k,1)
      commit('SAVECAR', list)
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