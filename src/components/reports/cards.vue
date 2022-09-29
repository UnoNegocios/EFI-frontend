<template>
    <v-row class="ma-0 mb-4" v-if="loading">
        <v-col md="2" sm="6" class="px-2" v-for="(loader, index) in loaders" v-bind:key="index">
            <v-card class="pb-2 pt-3 px-4 elevation-0">
                <v-skeleton-loader type="text" width="40%"></v-skeleton-loader>
                <v-skeleton-loader type="text" width="80%"></v-skeleton-loader>
                <v-skeleton-loader type="text" width="80%"></v-skeleton-loader>
            </v-card>
        </v-col>
    </v-row>
    <div v-else>
        <v-toolbar-title class="ml-2 mt-4"><strong>Ventas</strong></v-toolbar-title>

        <v-row class="ma-0">
            <v-col md="4" sm="6" class="px-2">
                <v-card class="py-2 px-4 elevation-0">
                    <v-icon x-small color="#47bdc6" class="mr-1">mdi-record</v-icon> 
                    <span style="font-size:12px;"><strong>Subtotal</strong></span>
                    <br/>{{(totals.sum_subtotal*1).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}
                    <br/><span style="font-size:12px; color:grey;">Promedio:<strong>{{(totals.avg_subtotal*1).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong></span>
                </v-card>
            </v-col>
            <v-col md="4" sm="6" class="px-2">
                <v-card class="py-2 px-4 elevation-0">
                    <v-icon x-small color="#ff6d00" class="mr-1">mdi-circle</v-icon> 
                    <span style="font-size:12px;"><strong>IVA</strong></span>
                    <br/>{{(totals.sum_iva*1).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}
                    <br/><span style="font-size:12px; color:grey;">Promedio:<strong>{{(totals.avg_iva*1).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong></span>
                </v-card>
            </v-col>
            <v-col md="4" sm="6" class="px-2">
                <v-card class="py-2 px-4 elevation-0">
                    <v-icon x-small color="#4385f3" class="mr-1">mdi-circle</v-icon> 
                    <span style="font-size:12px;"><strong>Total</strong></span>
                    <br/>{{(totals.sum_total*1).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}
                    <br/><span style="font-size:12px; color:grey;">Promedio:<strong>{{(totals.avg_total*1).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong></span>
                </v-card>
            </v-col>
            <v-col md="4" sm="6" class="px-2">
                <v-card class="py-2 px-4 elevation-0">
                    <v-icon x-small color="#33a952" class="mr-1">mdi-circle</v-icon> 
                    <span style="font-size:12px;"><strong>Cobranza de Ventas</strong></span>
                    <br/>{{(totals.sum_payments*1).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}
                    <br/><span style="font-size:12px; color:grey;">Promedio:<strong>{{(totals.avg_payments*1).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong></span>
                </v-card>
            </v-col>
            <v-col md="4" sm="6" class="px-2">
                <v-card class="py-2 px-4 elevation-0">
                    <v-icon x-small color="#fbbc04" class="mr-1">mdi-circle</v-icon> 
                    <span style="font-size:12px;"><strong>Cuentas por Cobrar</strong></span>
                    <br/>{{(totals.sum_due_balance*1).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}
                    <br/><span style="font-size:12px; color:grey;">Promedio:<strong>{{(totals.avg_due_balance*1).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong></span>
                </v-card>
            </v-col>
            <v-col md="4" sm="6" class="px-2">
                <v-card class="py-2 px-4 elevation-0">
                    <v-icon x-small color="#ea4435" class="mr-1">mdi-circle</v-icon> 
                    <span style="font-size:12px;"><strong>Cobranza Vencida</strong></span>
                    <br/>{{(totals.sum_past_due_balance*1).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}
                    <!--br/><span style="font-size:12px; color:grey;">Promedio:<strong>{{(totals.avg_past_due_balance*1).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong></span-->
                </v-card>
            </v-col>
            <v-col md="4" sm="6" class="px-2">
                <v-card class="py-2 px-4 elevation-0">
                    <v-icon x-small color="#2fc5ff" class="mr-1">mdi-circle</v-icon> 
                    <span style="font-size:12px;"><strong>Utilidad de Ventas</strong></span>
                    <br/>{{(totals.sum_utilities*1).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}
                    <br/><span style="font-size:12px; color:grey;">Promedio:<strong>{{(totals.avg_utilities*1).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong></span>
                </v-card>
            </v-col>
            <v-col md="4" sm="6" class="px-2">
                <v-card class="py-2 px-4 elevation-0">
                    <v-icon x-small color="#9c27b0" class="mr-1">mdi-circle</v-icon> 
                    <span style="font-size:12px;"><strong>Kilos Vendidos</strong></span>
                    <br/>{{(totals.sum_weights*1).toFixed(2)}}
                    <br/><span style="font-size:12px; color:grey;">Promedio:<strong>{{(totals.avg_weights*1).toFixed(2)}}</strong></span>
                </v-card>
            </v-col>
            <v-col md="4" sm="6" class="px-2">
                <v-card class="py-2 px-4 elevation-0">
                    <v-icon x-small color="#ea4435" class="mr-1">mdi-circle</v-icon> 
                    <span style="font-size:12px;"><strong>En Credito</strong></span>
                    <br/>{{(totals.sum_credito*1).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}
                    <!--br/><span style="font-size:12px; color:grey;">Promedio:<strong>{{(totals.avg_past_due_balance*1).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong></span-->
                </v-card>
            </v-col>
        </v-row>

        <v-toolbar-title class="ml-2 mt-4"><strong>Cobranza</strong></v-toolbar-title>

        <v-row class="ma-0">
            <v-col md="4" sm="6" class="px-2" v-for="(total, index) in collections_totals" v-bind:key="index">
                <v-card class="py-2 px-4 elevation-0">
                    <v-row class="ma-0 my-2">
                        <v-icon x-small :color="colors[index]" class="mr-1">mdi-circle</v-icon> 
                        <span style="font-size:12px;"><strong>{{total.method}}</strong></span>
                        <v-spacer></v-spacer>
                        <span style="font-size:12px; color:grey;">Total:<strong>{{(total.total).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong></span>
                    </v-row>
                    <span style="font-size:13px;">Serie A: </span>
                    <strong>{{(total.sum_serie_a).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong>
                    <br/>
                    <span style="font-size:13px;">Serie B: </span>
                    <strong>{{(total.sum_serie_b).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong>
                </v-card>
            </v-col>
        </v-row>

        <v-toolbar-title class="ml-2 mt-4"><strong>Inventario</strong></v-toolbar-title>

        <v-row class="ma-0">
            <v-col md="4" sm="6" class="px-2">
                <v-card class="py-2 px-4 elevation-0" disabled>
                    <v-icon x-small color="#ea4435" class="mr-1">mdi-circle</v-icon> 
                    <span style="font-size:12px;"><strong>Costo</strong></span>
                    <br/><span>{{intentoryReport.total_inventory_cost}}</span>
                    <br/><span style="font-size:12px; color:grey;">Promedio:<strong>{{intentoryReport.avg_inventory_cost}}</strong></span>
                </v-card>
            </v-col>
            <v-col md="4" sm="6" class="px-2">
                <v-card class="py-2 px-4 elevation-0" disabled>
                    <v-icon x-small color="#47bdc6" class="mr-1">mdi-circle</v-icon> 
                    <span style="font-size:12px;"><strong>Kilos</strong></span>
                    <br/><span>{{intentoryReport.total_inventory}}</span>
                    <br/><span style="font-size:12px; color:grey;">Promedio:<strong>{{intentoryReport.avg_inventory}}</strong></span>
                </v-card>
            </v-col>
        </v-row>

        <v-toolbar-title class="ml-2 mt-4"><strong>Gastos</strong></v-toolbar-title>

        <v-row class="ma-0">
            <v-col md="4" sm="6" class="px-2">
                <v-card class="py-2 px-4 elevation-0" disabled>
                    <v-icon x-small color="#ea4435" class="mr-1">mdi-circle</v-icon> 
                    <span style="font-size:12px;"><strong>Total</strong></span>
                    <br/><span>{{(0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</span>
                    <br/>
                    <span style="font-size:12px;">Serie A: </span>
                    <strong style="font-size:13px;">{{(0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong>
                    <br/>
                    <span style="font-size:12px;">Serie B: </span>
                    <strong style="font-size:13px;">{{(0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong>
                </v-card>
            </v-col>
            <v-col md="4" sm="6" class="px-2">
                <v-card class="py-2 px-4 elevation-0" disabled>
                    <v-icon x-small color="#ea4435" class="mr-1">mdi-circle</v-icon> 
                    <span style="font-size:12px;"><strong>Pagado</strong></span>
                    <br/><span>{{(0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</span>
                    <br/>
                    <span style="font-size:12px;">Serie A: </span>
                    <strong style="font-size:13px;">{{(0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong>
                    <br/>
                    <span style="font-size:12px;">Serie B: </span>
                    <strong style="font-size:13px;">{{(0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong>
                </v-card>
            </v-col>
            <v-col md="4" sm="6" class="px-2">
                <v-card class="py-2 px-4 elevation-0" disabled>
                    <v-icon x-small color="#ea4435" class="mr-1">mdi-circle</v-icon> 
                    <span style="font-size:12px;"><strong>Pendiente</strong></span>
                    <br/><span>{{(0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</span>
                    <br/>
                    <span style="font-size:12px;">Serie A: </span>
                    <strong style="font-size:13px;">{{(0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong>
                    <br/>
                    <span style="font-size:12px;">Serie B: </span>
                    <strong style="font-size:13px;">{{(0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong>
                </v-card>
            </v-col>
        </v-row>

        <v-toolbar-title class="ml-2 mt-4"><strong>Compras</strong></v-toolbar-title>

        <v-row class="ma-0">
            <v-col md="4" sm="6" class="px-2">
                <v-card class="py-2 px-4 elevation-0" disabled>
                    <v-icon x-small color="#47bdc6" class="mr-1">mdi-record</v-icon> 
                    <span style="font-size:12px;"><strong>Subtotal</strong></span>
                    <br/><span>{{(0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</span>
                    <br/><span style="font-size:12px; color:grey;">Promedio:<strong>{{(0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong></span>
                </v-card>
            </v-col>
            <v-col md="4" sm="6" class="px-2">
                <v-card class="py-2 px-4 elevation-0" disabled>
                    <v-icon x-small color="#ff6d00" class="mr-1">mdi-circle</v-icon> 
                    <span style="font-size:12px;"><strong>IVA</strong></span>
                    <br/><span>{{(0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</span>
                    <br/><span style="font-size:12px; color:grey;">Promedio:<strong>{{(0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong></span>
                </v-card>
            </v-col>
            <v-col md="4" sm="6" class="px-2">
                <v-card class="py-2 px-4 elevation-0" disabled>
                    <v-icon x-small color="#ff6d00" class="mr-1">mdi-circle</v-icon> 
                    <span style="font-size:12px;"><strong>ISR</strong></span>
                    <br/><span>{{(0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</span>
                    <br/><span style="font-size:12px; color:grey;">Promedio:<strong>{{(0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong></span>
                </v-card>
            </v-col>
            <v-col md="4" sm="6" class="px-2">
                <v-card class="py-2 px-4 elevation-0" disabled>
                    <v-icon x-small color="#4385f3" class="mr-1">mdi-circle</v-icon> 
                    <span style="font-size:12px;"><strong>Total</strong></span>
                    <br/><span>{{(0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</span>
                    <br/><span style="font-size:12px; color:grey;">Promedio:<strong>{{(0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong></span>
                </v-card>
            </v-col>
            <v-col md="4" sm="6" class="px-2">
                <v-card class="py-2 px-4 elevation-0" disabled>
                    <v-icon x-small color="#4385f3" class="mr-1">mdi-circle</v-icon> 
                    <span style="font-size:12px;"><strong>Pagado</strong></span>
                    <br/><span>{{(0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</span>
                    <br/><span style="font-size:12px; color:grey;">Promedio:<strong>{{(0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong></span>
                </v-card>
            </v-col>
            <v-col md="4" sm="6" class="px-2">
                <v-card class="py-2 px-4 elevation-0" disabled>
                    <v-icon x-small color="#4385f3" class="mr-1">mdi-circle</v-icon> 
                    <span style="font-size:12px;"><strong>Pendiente</strong></span>
                    <br/><span>{{(0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</span>
                    <br/><span style="font-size:12px; color:grey;">Promedio:<strong>{{(0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong></span>
                </v-card>
            </v-col>
        </v-row>

    </div>
</template>

<script>

export default {
    props:{
        company:String
    },
    data: () => ({
        loaders:['loader-1', 'loader-2', 'loader-3', 'loader-4', 'loader-5', 'loader-6'],
        colors:['#47bdc6', '#ff6d00', '#4385f3', '#33a952'],
    }),
    created(){
        this.$store.dispatch('quotation/getTotals')
        this.$store.dispatch('collection/getTotals')
    },
    computed:{
        totals(){
            return this.$store.state.quotation.totals
        },
        loading(){
            return this.$store.state.quotation.total_loader
        },
        intentoryReport(){
            return this.$store.state.item.intentoryReport
        },
        collections_totals(){
            var perro = this.$store.state.collection.totals
            return perro
        },
        loading(){
            return this.$store.state.collection.total_loader
        },
        sumTotals(){
            var sum = 0
            var totals = this.totals
            for(var i=0; i<totals.length; i++){
                sum = sum + totals[i].total
            }
            return sum
        }
    },
    methods:{
             
    }
}
</script>
<style>
.botonPerron {
    background: white;
    border-radius: 5px;
    height: 25px!important;
    margin-bottom: -17px;
    width: 90px!important;
}
</style>