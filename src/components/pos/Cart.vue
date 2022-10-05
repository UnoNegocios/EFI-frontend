<template>
    <v-container >
        <v-row class="ma-0 mt-2 pl-5">
            <strong>cart ({{cartCount}})</strong>
        </v-row>
        <v-row  id="scroll-target" style="height: 80vh;  overflow-x:hidden;" class="overflow-y-auto">
            <v-list class="pb-0" style="max-width: 250px;">
                <v-list-item v-for="(item,index) in StoreCart" :key="index" style="border-bottom:1px solid #e0e0e0; margin-left:5px">
                    <v-list-item-content style="padding-top: 10px!important;">
                        <div style="font-size: 15px!important; font-weight:500;"> {{item.product.name}}</div>
                        <div style="font-size: 14px!important;">c/u = {{(productPrice(item.product)*1).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</div>
                        <!--div style="font-size: 14px!important;">subtotal = {{(productPrice(item.product) * item.quantity).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</div-->
                        <v-row class="ma-0 px-2" style="background: #ecedf3; padding-top: 4px; border-radius: 5px; margin-top: 4px!important;">
                            <v-btn style="margin-top:-4px;" class="mr-4" icon small @click="downItem(index)">
                                <v-icon small>  mdi-minus </v-icon>
                            </v-btn>
                            ({{item.quantity}})
                            <v-btn style="margin-top:-4px;" class="ml-4" icon small @click="upItem(item.product.id, index)">
                                <v-icon small>  mdi-plus </v-icon>
                            </v-btn>
                            <v-spacer/>
                            <v-btn style="margin-top:-4px;" icon small @click="removeItem(index)">
                                <v-icon small>  mdi-delete </v-icon>
                            </v-btn>
                        </v-row>
                    </v-list-item-content>
                </v-list-item>   
            </v-list>
        </v-row>
        <v-row>
            <v-col class="total pa-0">
                <v-card tile class="pa-6">
                    <strong>Sub-Total:</strong> {{subtotal}}
                    <br>
                    <strong>IVA:</strong> {{iva}}
                    <br>
                    <strong>Total:</strong> {{subtotal+iva}}
                </v-card>
                <v-card tile color="primary"><!-- # d71182 -->
                    <v-list-item link @click="dialogPago=true" dark>
                        <v-list-item-content style="color:white;"><!-- #32241c -->
                            <strong>PAGAR</strong>
                        </v-list-item-content>
                    </v-list-item>    
                </v-card>
            </v-col>
        </v-row>

        <!-- Dialogo ticket -->
        <v-dialog v-model="dialogTicket" max-width="350px">
            <ticket @cerrar="cerrarTicket" v-bind:imprimir="ticket"></ticket>
        </v-dialog> 
        <!-- Dialogo ticket -->
        <v-dialog v-model="dialogPago" max-width="720px">
            <v-card>
              <!-- Titulo -->
              <v-card-title>
                <span class="headline">Metodo de Pago</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <!-- Formulario -->
                  <v-row>
                    <v-row class="form-group px-6 py-2" v-for="(metodo,k) in ticket.metodos" :key="k">
                        <v-col cols="5" class="py-0 my-0">
                            <v-select :items="metodosLists" v-model="metodo.metodo" item-value="id" item-text="method" label="Metodo de pago"></v-select>
                        </v-col>
                        <v-col cols="4" class="py-0 my-0">
                            <v-text-field v-model="metodo.monto" prefix="$" suffix="c/u" label="Monto"></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-icon @click="remove(k)" v-show="k || ( !k && ticket.metodos.length > 1)" color="red">mdi-close</v-icon>
                            <v-icon @click="add(k)" v-show="k == ticket.metodos.length-1" color="primary">mdi-plus</v-icon>
                        </v-col>
                    </v-row>
                  </v-row>
                </v-container>
              </v-card-text>
              
              <!--v-divider class="mx-12 my-6 mt-0"></v-divider>
              <div class="text-center">
                <v-btn v-if="perro=='no'" color="grey" @click="perro='si'" text>Agendar Envío</v-btn>
                <v-btn v-if="perro=='si'" color="grey" @click="perro='no'" text><v-icon> mdi-chevron-up</v-icon></v-btn>
              </div>
              <v-card-subtitle class="pb-0" v-if="perro=='si'">
                <h3><strong>Notas</strong></h3>
              </v-card-subtitle>
              <v-card-text v-if="perro=='si'">
                <v-container>
                  <v-row>
                    <v-col cols="12" class="pt-0" sm="6" md="7">
                      <v-textarea v-model="ticket.comentario" label="Mensaje personalizado"></v-textarea>
                    </v-col>
                    <v-col cols="12" class="pt-0" sm="6" md="5">
                        <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
                            <template v-slot:activator="{ on }">
                            <v-text-field clearable required v-model="ticket.fecha.dia" label="Fecha de entrega" prepend-icon="event" readonly v-on="on"></v-text-field>
                            </template>
                            <v-date-picker color="primary" v-model="ticket.fecha.dia" @input="menu = false"></v-date-picker>
                        </v-menu>
                        <v-menu ref="menu" v-model="menu2" :close-on-content-click="false" :nudge-right="40" :return-value.sync="menu2" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="ticket.fecha.hora" label="Hora de entrega" prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on"></v-text-field>
                            </template>
                            <v-time-picker v-if="menu2" v-model="ticket.fecha.hora" full-width @update:period="$refs.menu.save(ticket.fecha.hora)"></v-time-picker>
                        </v-menu>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text-->
              <!-- Cancelar y Guardar -->
              <v-card-actions>
                <v-menu v-model="menu3" v-if="currentUser.id == 10 || currentUser.id == 1 || currentUser.id == 9" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
                    <template v-slot:activator="{ on }">
                    <v-text-field clearable required v-model="ticket.fecha_de_creacion" label="Fecha de venta" prepend-icon="event" readonly v-on="on"></v-text-field>
                    </template>
                    <v-date-picker color="primary" v-model="ticket.fecha_de_creacion" @input="menu3 = false"></v-date-picker>
                </v-menu>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" @click="cerrarTicket()" text>Cancelar</v-btn>
                  <v-btn color="blue darken-1" @click="save()" text>Guardar</v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog> 
    </v-container>
</template>

<script>
import axios from "axios";
import Ticket from "../pos/Ticket"
export default {
    props:{
        cliente:String,
    },
    components: {
        'ticket':Ticket,
    },
    data:()=>({
        rebajo:'',
        dialogPago:false,
        dialogTicket:false,
        menu:false,
        menu2:false,
        menu3:false,
        ticket:{
            
        }
    }),
    computed: {
        metodosLists(){
            return this.$store.state.payment_method.payment_methods
        },
        currentUser:{
            get(){
                return this.$store.state.currentUser.user;
            }
        },
        StoreCart() {
            return this.$store.state.cart.carts
        },
        cartCount() {
            var sum = 0
            for(var i=0; i<this.StoreCart.length; i++){
                sum = sum + this.StoreCart[i].quantity
            }
            return sum
        },
        subtotal: function(){
            var sum = 0;
            this.StoreCart.forEach(e => {
                sum += (Number(e.quantity*this.productPrice(e.product))/1.16);
            });
            return sum.toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})
        },
        iva: function(){
            var sum = 0;
            this.StoreCart.forEach(e => {
                sum += (Number(e.quantity*this.productPrice(e.product)))*.16;
            });
            return sum.toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})
        },
    },
    created(){
        this.$store.dispatch('currentUser/getUser')
    },
    methods: {
        productPrice(product){
            console.log(product)
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
        add(index) {
            this.ticket.metodos.push({ metodo: '', monto: '' });
        },
        remove(index) {
            this.ticket.metodos.splice(index, 1);
        },
        removeItem(index) {
            this.$store.dispatch('cart/removeItem', index);
        },
        downItem(index) {
            this.$store.dispatch('cart/downItem', index);
        },
        upItem(id, index) {
            this.$store.dispatch('cart/upItem', {'id':id, 'index':index});
        },
        save(){
            
            //axios.post('https://bdb.unocrm.mx/api/v1/venta/guardar',Object.assign(this.ticket)).then(resp => {
                this.ticket.valor = value;
                this.dialogTicket=true;
            //})
        },
        cerrarTicket: function(params) {
            this.dialogTicket=false;
            location.reload();
        },
    },
};
</script>

<style>
.total{
    position:absolute!important; 
    bottom:0!important;
}
</style>


precio mostrador -> 3
precio mayoreo -> 1


permiso venta precio menor que costo y producto en $0.00


Todos los productos son con iva en ferreteria y en efi sin iva