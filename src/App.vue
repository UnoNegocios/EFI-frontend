<template>
  <v-app :dark="true">
    <v-main v-if="printed!=null">
      <print></print>
    </v-main>
    <v-main v-else-if="printNominas!=null">
      <nominas></nominas>
    </v-main>
    <v-main v-else-if="printSales!=null">
      <sales/>
    </v-main>
    <v-main v-else-if="printShipping!=null">
      <shippings/>
    </v-main>
    <v-main v-else-if="printTicket!=null">
      <ticket/>
    </v-main>
    <v-main v-else>
      <app v-if="token!=null"></app>
      <login v-else></login>
    </v-main>
    <v-snackbar bottom right :value="updateExists" :timeout="0" color="primary">
      Hay una actualización disponible!
      <v-btn text @click="refreshApp">
        Actualizar
      </v-btn>
    </v-snackbar>
  </v-app>
</template>
<script>
import App from "../src/views/App"
import Login from "../src/views/Login"
import Print from "../src/components/quotations/viewPdf"
import PrintSale from "../src/components/sales/viewPdf"
import Nominas from "../src/components/payrolls/print"
import PrintShipping from "../src/components/shippings/print"
import PrintTicket from "../src/components/sales/printTicket"
import axios from "axios"
export default {
  name: 'App',
  data: () => ({
    token:localStorage.getItem("xn8(*&^%$#47b*g3f76gw3*&^fn734gf8q*&^&^&mwmeg934g8whmre7ngN&G#*!NG@*&#GF(!*#gm1n428fm1g3n84gmf*^$&(%$)e3298negmg"),
    printed: localStorage.getItem("print"),
    printNominas: localStorage.getItem("nominas"),
    printSales: localStorage.getItem("salePrint"),
    printShipping: localStorage.getItem("printShipping"),
    printTicket: localStorage.getItem("printTicket"),
  }),
  components:{ 
    'app':App, 
    'login':Login,
    'print':Print,
    'nominas':Nominas,
    'sales':PrintSale,
    'shippings':PrintShipping,
    'ticket':PrintTicket,
  },
  mounted(){
    axios.get(process.env.VUE_APP_BACKEND_ROUTE + "api/v1/user/current").catch(error => {
      localStorage.removeItem("xn8(*&^%$#47b*g3f76gw3*&^fn734gf8q*&^&^&mwmeg934g8whmre7ngN&G#*!NG@*&#GF(!*#gm1n428fm1g3n84gmf*^$&(%$)e3298negmg");
      this.token = null
    });
  },
  methods:{
    refreshApp() {
      this.updateExists = false
      // Make sure we only send a 'skip waiting' message if the SW is waiting
      if (!this.registration || !this.registration.waiting) return
      // Send message to SW to skip the waiting and activate the new SW
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
  }
};
</script>