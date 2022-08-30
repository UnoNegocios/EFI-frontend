<template>
  <v-container>
    <v-card class="elevation-0">
        <v-row class="ma-0 pa-6">
            <v-spacer/>
            <v-autocomplete @keydown.enter="filter()" v-model="product" :items="productsList" :loading="isLoadingProducts" :search-input.sync="searchProducts" hide-no-data item-value="id" item-text="name" label="Producto" placeholder="Escribe para buscar o crear" attach chips multiple></v-autocomplete>
            <v-spacer/>
        </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
    data:()=>({
        entries:{
            products: []
        },
        isLoadingProducts: false,
        searchProducts: null,
    }),
    watch: {
        searchProducts(val){
            //if (this.companyLists.length > 0) return
            if (this.isLoadingProducts) return
            this.isLoadingProducts = true
            axios.get(process.env.VUE_APP_BACKEND_ROUTE + 'api/v2/company_p?filter[name]='+val)
            .then(res => {
                this.entries.products = res.data.data
            }).finally(() => (this.isLoadingProducts = false))
        },
    },
    computed: {
        productsList(){
            return this.entries.products.map(id => {
                return{
                    id:id.id,
                    name:id.name,
                    code_one:id.code_one,
                    code_two:id.code_two,
                    code_three:id.code_three,
                    price_one:id.price_one,
                    price_two:id.price_two,
                    price_three:id.price_three,
                    price_four:id.price_four,
                    sat_key_code:id.sat_key_code
                }
            })
        },
    }
}
</script>

<style>

</style>