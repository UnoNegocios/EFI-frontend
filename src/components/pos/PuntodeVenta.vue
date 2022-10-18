<template>
    <v-container class="pl-9">
        <!-- carrito-->
        <v-navigation-drawer style="top:0!important; height:100vh; max-height:100vh;" right v-model="open_cart" :clipped="$vuetify.breakpoint.lgAndUp" app>
            <cart/>
        </v-navigation-drawer>

        <v-row class="ma-0 pa-4">
            <v-autocomplete @keydown.enter="filter()" v-model="client_id" :items="companyLists" :loading="isLoadingCompany" :search-input.sync="searchCompanies" hide-no-data item-value="id" item-text="name" label="Empresa(s)" placeholder="Escribe para buscar" attach>
                <template v-slot:item="{item, attrs, on}">
                    <v-list-item v-on="on" v-bind="attrs">
                        <v-list-item-content>
                            <v-list-item-title v-if="item.name!=null">
                                <span v-if="item.macro!=null">{{item.macro}}</span>{{item.name}}
                                <div v-if="item.razon_social!=null">
                                    <span style="font-size:12px;">{{item.razon_social}}</span>
                                </div>
                            </v-list-item-title>
                            <v-list-item-title v-else-if="item.razon_social!=null">
                                {{item.razon_social}}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template> 
            </v-autocomplete>
            
            <v-btn class="ml-12 mt-4 elevation-0" rounded color="primary" @click="createDialog = true">Agrgar Cliente</v-btn>
        </v-row>

        <v-row justify="center" class="ma-0">
            <v-col class="my-4 mx-0" v-for="(product,k) in products" :key="k" cols="4">
                <v-card @click="addToCart(product)"><!--:disabled="product.inventory>0"-->
                    <!--v-img height="150px" width="19vw" v-bind:src="liga + 'files/' + product.image"></v-img-->
                    <v-card-subtitle class="pb-0">{{product.name}}</v-card-subtitle>
                    <v-card-text class="text--primary">
                        <div>{{(productPrice(product)*1).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-divider class="my-6 mx-12"></v-divider>
                <button @click="limit = limit+12">Ver Más</button>
            <v-divider  class="my-6 mx-12"></v-divider>
        </v-row>
        <!-- Crear Cliente -->
        <v-dialog v-model="createDialog" max-width="700px">
          <create @closeCreateDialogClient="closeCreateDialogClient"/>
        </v-dialog>
    </v-container>    
</template>
<script>
import axios from "axios";
import Cart from "../pos/Cart"
import Create from "../clients/companies/create"
export default {
    components: {
        'cart':Cart,
        'create':Create,
    },
    data:()=>({ 
        createDialog:false,
        client_id:'',
        open_cart:true,
        limit:12,
        entries:{
            companies: []
        },
        isLoadingCompany: false,
        searchCompanies: null,
    }),
    computed:{
        companyLists(){
            return this.entries.companies.map(id=>{
                return{
                    id:id.id,
                    name:id.attributes.name,
                    macro:id.attributes.macro,
                    razon_social:id.attributes.razon_social,
                    price_list:id.attributes.price_list
                }
            })
        },
        liga(){
            return process.env.VUE_APP_BACKEND_ROUTE
        },
        cart() {
            return this.$store.state.cart.carts
        },
        products(){
            return this.$store.state.product.products
        },
        client(){
            console.log('perro')
            var perro = this.$store.state.cart.client
            console.log(perro)
            return perro
        }
    },
    methods:{
        closeCreateDialogClient: function(params) {
            this.createDialog = false;
        },
        addToCart(id) {
            this.$store.dispatch("cart/addItem", id);
        },
        productPrice(product){
            if(product.price > 0 && product.price != undefined && product.price != '' && product.price != null){
                return product.price
            }else{
                if(product.price_one > 0 && product.price_one != undefined && product.price_one != '' && product.price_one != null){
                    return product.price_one
                }else{
                    if(product.price_two > 0 && product.price_two != undefined && product.price_two != '' && product.price_two != null){
                        return product.price_two
                    }else{
                        if(product.price_three > 0 && product.price_three != undefined && product.price_three != '' && product.price_three != null){
                            return product.price_three
                        }else{
                            if(product.price_four > 0 && product.price_four != undefined && product.price_four != '' && product.price_four != null){
                                return product.price_four
                            }else{
                                return 9999
                            }
                        }
                    }
                }
            }
        },
    },
    created(){
        this.$store.dispatch('product/getProducts', this.limit)
        this.$emit("closeDrawer", false);
    },
    watch:{
        client_id:{
            handler(){
                var client = this.companyLists.filter(client=>client.id == this.client_id)[0]
                this.$store.dispatch("cart/selectClient", client);
            }, deep: true,
        },
        limit:{
            handler(){
                this.$store.dispatch('product/getProducts', this.limit) 
            }, deep:true
        },
        searchCompanies(val){
            //if (this.companyLists.length > 0) return
            if (this.isLoadingCompany) return
            this.isLoadingCompany = true
            axios.get(process.env.VUE_APP_BACKEND_ROUTE + 'api/v2/companies?filter[name]='+val)
            .then(res => {
                this.entries.companies = this.entries.companies.concat(res.data.data)
            }).finally(() => (this.isLoadingCompany = false))
        },
    }
}
</script>