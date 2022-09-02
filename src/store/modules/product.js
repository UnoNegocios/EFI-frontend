import axios from "axios"
const state = {
    products:[],
    search:''
};
const getters = {};

const actions = {
    getProducts( {commit, state}, props ){
        state.search = props.searchInput
        axios
        .get(process.env.VUE_APP_BACKEND_ROUTE + "api/v2/items?filter[search]=", props.searchInput + '&itemsPerPage=' + props.items)
        .then(response => {
            commit('setProducts', response.data.data);
        });
    }
};

const mutations = {
    setProducts(state, data){
        state.products = data;
    }
};

export default{
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}