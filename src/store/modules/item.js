import axios from "axios"
const state = {
    items:[],
    reports:{
        total_inventory_cost: '',
        total_inventory: '',
        avg_inventory_cost: '',
        avg_inventory: '',
    },
};

const getters = {};

const actions = {
    getItems( {commit, state} ){
        axios
        .get(process.env.VUE_APP_BACKEND_ROUTE + "api/v1/item/all")
        .then(response => {

            commit('setItems', response.data);

            state.reports.total_inventory_cost = response.data.reduce((a, b) => (a*1) + ((b['cost'] || 0)*1), 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})

            state.reports.total_inventory = response.data.reduce((a, b) => (a*1) + ((b['inventory'] || 0)*1), 0).toFixed(2) + ' kg'

            state.reports.avg_inventory_cost = response.data.reduce((a, b) => (a*1) + ((b['cost'] || 0)*1), 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})

            state.reports.avg_inventory = response.data.reduce((a, b) => (a*1) + ((b['inventory'] || 0)*1), 0).toFixed(2) + ' kg'

        });
    }
};

const mutations = {
    setItems(state, data){
        state.items = data;
    }
};

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
