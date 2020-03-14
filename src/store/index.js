import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bid: "",
    tagId: "",
    pager: {
      total: 0,
      nowPage: 1,
      limit: 3,
      display: true,
      totalPage : 0
    }
  },
  mutations: {
    changeBid(state, bid) {
      state.bid = bid;
    },
    changeTagId(state, tagId){
      state.tagId = tagId;
    },
    pageShow(state, isShowPager) {
      state.pager.display = isShowPager;    
    },
    changePager(state, payload){
      state.pager = Object.assign({}, state.pager, payload);
    },
    clearTagId(state){
      state.tagId = '';
      localStorage.setItem('tagId', '');
    }
  },
  actions: {
  },
  modules: {
  }
})
