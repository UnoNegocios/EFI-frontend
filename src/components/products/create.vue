<template>
  <v-container>
    <v-card class="elevation-0 pa-6">
        <v-row class="ma-0">
            <v-col cols="7">
                <v-autocomplete v-if="newProduct==''" @keydown.enter="filter()" v-model="product_id" :items="productsList" :loading="isLoadingProducts" :search-input.sync="searchProducts" item-text="name" item-value="id" label="Producto" placeholder="Escribe para buscar o crear">
                    <template slot="no-data">
                        <div class="px-6 pt-3" v-if="searchProducts!=''">
                            No existen proveedores relacionados.
                            <v-text-field v-model="searchProducts" label="Crear Producto" append-icon="mdi-plus" @click:append="newProduct=searchProducts"></v-text-field>
                        </div>
                    </template>
                </v-autocomplete>
                <span v-else>{{newProduct}}</span>
            </v-col>
            <v-col cols="3">
                <div v-if="product.provider!=''">
                    <span>Proveedor Actual:</span>
                    <br/>
                    <v-chip :to="{ path: '/providers/'+ product.provider}" small class="mt-1" color="primary">{{product.provider}}</v-chip>
                </div>
                <v-autocomplete v-else :items="providers" :search-input.sync="createProvider.name" label="Proveedor" item-text="name" item-value="id" v-model="provider_id">
                    <template slot="no-data">
                        <div class="px-6 pt-3">
                            No existen proveedores relacionados.
                            <v-text-field v-model="createProvider.name" label="Crear Proveedor" append-icon="mdi-plus" @click:append="saveProvider()"></v-text-field>
                        </div>
                    </template>
                </v-autocomplete>
            </v-col>
            <v-col cols="2">
                <v-btn class="mt-3 elevation-0" color="primary" @click="saveProduct">Guardar</v-btn>
            </v-col>
        </v-row>
        <v-row class="ma-0">
            <v-col cols="6">
                <v-row class="ma-0 justify-center" style="border:solid 1px grey;">
                    <v-col cols="4" class="px-0">
                        <div class="tabla"></div>
                        <div class="tabla">
                            <span style="margin:auto;">Precio 1</span>
                        </div>
                        <div class="tabla">
                            <span style="margin:auto;">Precio 2</span>
                        </div>
                        <div class="tabla">
                            <span style="margin:auto;">Precio 3</span>
                        </div>
                        <div class="tabla">
                            <span style="margin:auto;">Precio 4</span>
                        </div>
                    </v-col>
                    <v-col cols="4" class="px-0">
                        <div class="tabla">
                            <span style="margin:auto;">
                                Sin IVA
                            </span>
                        </div>
                        <div class="tabla">
                            <v-text-field style="margin:auto;" prefix="$" class="mx-6" v-model="product.price_one"></v-text-field>
                        </div>
                        <div class="tabla">
                            <v-text-field style="margin:auto;" prefix="$" class="mx-6" v-model="product.price_two"></v-text-field>
                        </div>
                        <div class="tabla">
                            <v-text-field style="margin:auto;" prefix="$" class="mx-6" v-model="product.price_three"></v-text-field>
                        </div>
                        <div class="tabla">
                            <v-text-field style="margin:auto;" prefix="$" class="mx-6" v-model="product.price_four"></v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="4" class="px-0">
                        <div class="tabla">
                            <span style="margin:auto;">
                                Con IVA
                            </span>
                        </div>
                        <div class="tabla">
                            <v-text-field style="margin:auto;" prefix="$" v-model="iva.price_one" class="mx-6"></v-text-field>
                        </div>
                        <div class="tabla">
                            <v-text-field style="margin:auto;" prefix="$" v-model="iva.price_two" class="mx-6"></v-text-field>
                        </div>
                        <div class="tabla">
                            <v-text-field style="margin:auto;" prefix="$" v-model="iva.price_three" class="mx-6"></v-text-field>
                        </div>
                        <div class="tabla">
                            <v-text-field style="margin:auto;" prefix="$" v-model="iva.price_four" class="mx-6"></v-text-field>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="6">
                <v-row class="ma-0" style="border:solid 1px grey;">
                    <v-col cols="5" class="pa-0">
                        <div class="tabla">
                            <span style="margin:auto;">Costo</span>
                        </div>
                        <div class="tabla">
                            <v-text-field style="margin:auto;" prefix="$" class="mx-6"></v-text-field>
                        </div>
                        <div class="tabla">
                            <v-text-field style="margin:auto;" prefix="$" class="mx-6"></v-text-field>
                        </div>
                        <div class="tabla">
                            <v-text-field style="margin:auto;" prefix="$" class="mx-6"></v-text-field>
                        </div>
                        <div class="tabla">
                            <v-text-field style="margin:auto;" prefix="$" class="mx-6"></v-text-field>
                        </div>
                    </v-col>
                    <v-col cols="7" class="pa-0">
                        <div class="tabla">
                            <span style="margin:auto;">Utilidad</span>
                        </div>
                        <div class="tabla">
                            <v-text-field style="margin:auto;" suffix="%" class="ml-6 mr-3"></v-text-field>
                            <v-text-field style="margin:auto;" prefix="$" class="mr-6 ml-3"></v-text-field>
                        </div>
                        <div class="tabla">
                            <v-text-field style="margin:auto;" suffix="%" class="ml-6 mr-3"></v-text-field>
                            <v-text-field style="margin:auto;" prefix="$" class="mr-6 ml-3"></v-text-field>
                        </div>
                        <div class="tabla">
                            <v-text-field style="margin:auto;" suffix="%" class="ml-6 mr-3"></v-text-field>
                            <v-text-field style="margin:auto;" prefix="$" class="mr-6 ml-3"></v-text-field>
                        </div>
                        <div class="tabla">
                            <v-text-field style="margin:auto;" suffix="%" class="ml-6 mr-3"></v-text-field>
                            <v-text-field style="margin:auto;" prefix="$" class="mr-6 ml-3"></v-text-field>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <!-- Tabla -->
        <v-data-table
        v-if="product.item_shopping_details!=undefined"
        class="pa-4"
        :items="product.item_shopping_details" 
        :headers="header"
        :loading="isLoadingProducts">
            <!-- Header -->
            <template v-slot:top>
                <v-toolbar flat >
                    <v-toolbar-title>Compras</v-toolbar-title>
                </v-toolbar>
            </template>
            <!-- Tabla sin información -->
            <template v-slot:no-data>
                No existen registros de compras para este producto
            </template>
            <!-- Proveedor -->
            <template v-slot:[`item.shopping.provider`]="{ item }">
                <v-list-item class="px-0" style="min-height:0px!important; font-size:14px;" :to="{ path: '/shoppings/'+ item.shopping.provider}">{{item.shopping.provider}}</v-list-item>
            </template>
            <!-- Compra -->
            <template v-slot:[`item.shopping.id`]="{ item }">
                <v-list-item class="px-0" style="min-height:0px!important; font-size:14px;" :to="{ path: '/shoppings/'+ item.shopping.id}">{{item.shopping.id}}</v-list-item>
            </template>
            <!-- Costo -->
            <template v-slot:[`item.cost`]="{ item }">
                {{item.cost.toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}
            </template>
        </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios"
export default {
    data:()=>({
        provider_id:'',
        newProduct:'',
        product_id:'',
        product:{
            id:'',
            name:'',
            code_one:'',
            code_two:'',
            code_three:'',
            price_one:0,
            price_two:0,
            price_three:0,
            price_four:0,
            sat_key_code:'',
            provider:'',
            item_shopping_details:undefined
        },
        iva:{
            price_one:0,
            price_two:0,
            price_three:0,
            price_four:0
        },
        entries:{
            products: []
        },
        isLoadingProducts: false,
        searchProducts: null,
        createProvider:{
            name:'',
        },
        iva_pause:false,
        no_iva_pause:false,
    }),
    watch: {
        product_id:{
            handler(){
                this.product = this.productsList.filter(product=>product.id == this.product_id)[0]
            }, deep:true
        },
        searchProducts(val){
            //if (this.companyLists.length > 0) return
            if (this.isLoadingProducts) return
            this.isLoadingProducts = true
            axios.get(process.env.VUE_APP_BACKEND_ROUTE + 'api/v2/item/pos?filter[pos]='+val)
            .then(res => {
                this.entries.products = res.data.data
            }).finally(() => (this.isLoadingProducts = false))
        },
        price_one:{
            handler: function (val, oldVal) {
                if(val.iva!=oldVal.iva){
                    this.no_iva_pause = true
                }else if(val.price!=oldVal.price){
                    this.iva_pause = true
                }

                if(!this.no_iva_pause){
                    this.iva_pause = true
                    this.iva.price_one = (this.product.price_one*1.16).toFixed(2)
                }else{
                    this.no_iva_pause = false
                }
                
                if(!this.iva_pause){
                    this.no_iva_pause = true
                    this.product.price_one = (this.iva.price_one/1.16).toFixed(2)
                }else{
                    this.iva_pause = false
                }
            },deep:true,
        },
    },
    computed: {
        header(){ return [
            { text: 'Fecha', value: 'shopping.date' },
            { text: 'Cantidad', value: 'quantity' },
            { text: 'Costo', value: 'unit_cost' },
            { text: 'Proveedor', value: 'shopping.provider' },
            { text: 'Compra', value: 'shopping.id' },
        ]},
        price_one(){
            return {price:this.product.price_one, iva:this.iva.price_one}
        },
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
                    sat_key_code:id.sat_key_code,
                    provider:this.provider(id.latestShopping),
                    item_shopping_details:id.item_shopping_details
                }
            })
        },
        providers:{
            get(){
                return this.$store.state.provider.providers;
            }
        },
    },
    methods:{
        provider(latestShopping){
            if(latestShopping!=undefined){
                return latestShopping.shopping.provider
            }else{
                return ''
            }
        },
        saveProvider(){
            axios.post(process.env.VUE_APP_BACKEND_ROUTE + "api/v2/item/pos",Object.assign(this.createProvider)).then(response=>{
                this.$store.dispatch('provider/getProviders')
            }) 
        },
        saveProduct(){
            var new_product = [this.product].map(id=>{return{
                name:this.newProduct,
                code_one:id.code_one,
                code_two:id.code_two,
                code_three:id.code_three,
                price_one:id.price_one,
                price_two:id.price_two,
                price_three:id.price_three,
                price_four:id.price_four,
                sat_key_code:id.sat_key_code,
                provider_id:this.provider_id,
            }})[0]
            axios.post(process.env.VUE_APP_BACKEND_ROUTE + "api/v1/item/create", new_product).then(response=>{
                this.$store.dispatch('provider/getProviders')
            }) 
        },
        modifyProduct(){
            if(this.provider_id!=''){
                this.product.provider_id = this.provider_id
            }
            axios.patch(process.env.VUE_APP_BACKEND_ROUTE + "api/v2/item/pos", this.product).then(response=>{
                this.$store.dispatch('provider/getProviders')
            }) 
        }
    }
}
</script>

<style>
.tabla{
    border: solid 1px grey!important;
    border-radius: 0px!important;
    height:100px;
    display: flex!important;
}
</style>