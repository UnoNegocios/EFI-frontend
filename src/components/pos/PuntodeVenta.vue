<template>
    <v-container class="pl-9">
        <!-- carrito-->
        <v-navigation-drawer style="top:0!important; height:100vh; max-height:100vh;" right v-model="open_cart" :clipped="$vuetify.breakpoint.lgAndUp" app>
            <cart/>
        </v-navigation-drawer>

        <v-row justify="center">
            <v-col class="my-4 mx-0" v-for="(product,k) in products" :key="k">
                <v-card :disabled="product.inventory>0" @click="addToCart(product)" width="19vw">
                    <v-img height="150px" width="19vw" v-bind:src="liga + 'files/' + product.image"></v-img>
                    <v-card-subtitle class="pb-0">{{product.name}}</v-card-subtitle>
                    <v-card-text class="text--primary">
                        <div>{{(product.value).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-divider class="my-6 mx-12"></v-divider>
                <button @click="limit = limit+12">Ver Más</button>
            <v-divider  class="my-6 mx-12"></v-divider>
        </v-row>
    </v-container>    
</template>
<script>
import axios from "axios";
import Cart from "../pos/Cart"
export default {
    components: {
        'cart':Cart,
    },
    data:()=>({ 
        open_cart:true,
        limit:12,
    }),
    computed:{
        liga(){
            return process.env.VUE_APP_BACKEND_ROUTE
        },
        cart() {
            return this.$store.state.cart.carts
        },
        products(){
            return this.$store.state.product.products
        },
    },
    methods:{
        addToCart(id) {
            this.$store.dispatch("cart/addItem", id);
        }
    },
    created(){
        this.$emit("closeDrawer", false);
    },
    watch:{
        limit:{
            handler(){
                this.$store.dispatch('product/getProducts', {search:this.$store.state.products.search, items:this.limit}) 
            }, deep:true
        }
    }
}
</script>