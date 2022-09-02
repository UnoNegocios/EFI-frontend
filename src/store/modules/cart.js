
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
    carts:[]
};
const getters = {
};
const actions = {
    addItem(context, id) {
        context.commit("ADD_Item", id);
    },
    removeItem(context, index) {
        context.commit("REMOVE_Item", index);
    },
};
const mutations = {
    ADD_Item(state, id) {
        state.carritos.push(id);
    },
    REMOVE_Item(state, index) {
        state.carritos.splice(index, 1);
    },
};

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};