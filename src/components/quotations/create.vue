<template>
    <v-card>
        <v-card-title class="pb-0 pt-1" >
            <v-icon style="background: #e7e8e9; padding: 10px!important; border-radius: 50%;" class="mr-4">mdi-file-document-outline</v-icon>
            <span >Nueva {{quole}}</span>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="6" md="3">
                <v-autocomplete  :rules="[v => !!v || 'Campo requerido']" v-if="permissions('assignQuotations')" clearable v-model="quotation.user_id" :items="usersLists" label="Vendedor" item-text="name" item-value="id">
                    <template slot="no-data" class="pa-2">No existen usuarios relacionados.</template>                      
                </v-autocomplete>
                <v-autocomplete v-else-if="quotation.user_id=currentUser.id" disabled v-model="quotation.user_id" :items="usersLists" label="Vendedor" item-text="name" item-value="id">                
                </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6" md="2" class="pb-0 mb-0" v-if="quole=='Venta'">
                <v-checkbox v-model="quotation.bar" label="Mostrador"></v-checkbox>
            </v-col>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pb-0">
            <v-container>
                <v-row class="py-6">
                    <v-col class="pt-0" cols="12" sm="6" md="3">
                        <v-autocomplete clearable v-model="quotation.company_id"  :rules="[v => !!v || 'Campo requerido']" :items="companyLists" label="Empresa" item-text="name" item-value="id">
                            <template slot="no-data"><div class="px-4 py-1">No existen empresas relacionadas. <v-btn rounded class="mx-3" color="primary" @click="createCompanyDialog=true" x-small>Crear</v-btn></div></template>                      
                        </v-autocomplete>
                    </v-col>
                    <v-col class="pt-0" cols="12" sm="6" md="3">
                        <v-autocomplete :disabled="quotation.company_id==null" clearable v-model="quotation.contact_id" :items="contactLists" label="Contacto" item-text="name" item-value="id">
                            <template slot="no-data"><div class="px-4 py-1">No existen contactos relacionados. <v-btn rounded class="mx-3" color="primary" @click="createContactDialog=true" x-small>Crear</v-btn></div></template>                      
                        </v-autocomplete>
                    </v-col> 
                    <v-col class="pt-0" cols="12" sm="6" md="3">
                        <v-autocomplete clearable v-model="quotation.type" :rules="[v => !!v || 'Campo requerido']" :items="series" label="Tipo de Venta">
                            <template slot="no-data" class="pa-2">No existen tipos de venta relacionados.</template>                      
                        </v-autocomplete>
                    </v-col>
                    <v-col class="pt-0" cols="12" sm="6" md="3" v-if="quole=='Venta'">
                        <v-menu v-model="datePicker" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
                            <template v-slot:activator="{ on }">
                                <v-text-field :rules="[v => !!v || 'Campo requerido']" clearable required v-model="quotation.date" label="Fecha Programada" prepend-icon="mdi-calendar" readonly v-on="on"></v-text-field>
                            </template>
                            <v-date-picker color="primary" v-model="quotation.date" @input="datePicker = false"></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col class="pt-0" cols="12" sm="6" md="3" v-if="quole=='Cotizaci??n'">
                        <v-menu v-model="datePicker" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
                            <template v-slot:activator="{ on }">
                                <v-text-field :rules="[v => !!v || 'Campo requerido']" clearable required v-model="quotation.due_date" label="Fecha de Vencimiento" prepend-icon="mdi-calendar" readonly v-on="on"></v-text-field>
                            </template>
                            <v-date-picker color="primary" v-model="quotation.due_date" @input="datePicker = false"></v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>  
                
                <v-row style="background-color: #94949417;" class="px-2 ma-0 py-2" v-for="(item,k) in quotation.items" :key="k">
                    <v-col ols="12" sm ="4" md="1" class="py-0 my-0">
                        <v-text-field type=number v-model="item.quantity" label="Cantidad"></v-text-field><!--:disabled="yanohay(item.quantity, item.item, k)" -->
                    </v-col>
                    <v-col ols="12" sm ="8" md="6" class="py-0 my-0">
                        <v-autocomplete item-text="detail"  v-model="item.item" :items="itemLists" item-value="id" label="Producto" clearable>
                            <template slot="no-data" class="pa-2">No existen productos relacionados.</template>  
                            <template v-slot:item="{item, attrs, on}">
                                <v-list-item v-on="on" v-bind="attrs">
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{item.name}} | {{(item.price*1).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}
                                            <div>
                                                <span style="font-size:12px;">Categor??a:</span>
                                                <template v-for="(category, index) in item.categories">
                                                    <v-chip  v-bind:key="index" small class="ml-2"  style="font-size:8px;">{{categoryName(category)}}</v-chip>
                                                </template>
                                            </div>
                                            <div>
                                                <span style="font-size:14px;">Inventario:
                                                    <strong v-if="item.inventory<1" style="color:red!important;">{{item.inventory}}</strong>
                                                    <strong v-else style="color:green!important;">{{item.inventory}}</strong>
                                                </span>
                                            </div>
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </template> 
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm ="8" md="4" class="py-0 my-0" v-if="item.item!=''">
                        <v-text-field v-model="item.price" prefix="$" suffix="c/u" label="Precio Ajustado"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm ="4" md="1">
                        <v-icon @click="remove(k)" v-show="k || ( !k && quotation.items.length > 1)" color="red">mdi-close</v-icon>
                        <v-icon @click="add(k)" v-show="k == quotation.items.length-1" color="primary">mdi-plus</v-icon>
                    </v-col>
                </v-row>

                <v-row class="mt-1 px-6">
                    <v-col cols="12" sm="6" md="6">
                        <v-container fluid>
                            <v-textarea v-model="quotation.note" label="Nota Interna"></v-textarea>
                        </v-container>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <!--strong>Subtotal Sugerido = {{totalQuotation.toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong-->
                        <v-text-field class="my-4" disabled v-if="quotation.subtotal=totalQuotation" v-model="quotation.subtotal" prefix="$" label="Monto en Pesos"></v-text-field>
                        <div v-if="quotation.type=='Serie B'">
                            <strong>IVA = {{(quotation.subtotal*.16).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong>
                            <br>
                            <strong>Total = {{(quotation.subtotal*1.16).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong>
                        </div>
                        <div v-if="quotation.type=='Serie A'">
                            <strong>IVA = {{(quotation.subtotal*.16).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong>
                            <br>
                            <strong>Total = {{(quotation.subtotal*1.16).toLocaleString('es-MX', { style: 'currency', currency: 'MXN',})}}</strong>
                        </div>

                        <v-menu v-if="quole=='Venta' && quotation.type=='Serie A'" v-model="datePicker2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px" >
                            <template v-slot:activator="{ on }">
                                <v-text-field :rules="[v => !!v || 'Campo requerido']" clearable required v-model="quotation.invoice_date" label="Fecha de Facturaci??n" prepend-icon="mdi-calendar" readonly v-on="on"></v-text-field>
                            </template>
                            <v-date-picker color="primary" v-model="quotation.invoice_date" @input="datePicker2 = false"></v-date-picker>
                        </v-menu>

                        <v-text-field v-if="quole=='Venta' && quotation.type=='Serie A'" :rules="[v => !!v || 'Campo requerido']" clearable required v-model="quotation.invoice" label="Factura"></v-text-field>


                    </v-col>
                </v-row>
                
            </v-container>
        </v-card-text>
        <v-row class="ma-0 pa-0">
            <v-col cols="12" sm="12" md="6">
                <v-menu top offset-x class="hidden-md-and-down">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn :color="colorFile" style="font-size:12px;" text v-bind="attrs" v-on="on">
                            <v-icon class="mr-2">mdi-attachment</v-icon> Adjuntar archivo
                        </v-btn>
                    </template>
                    <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" :useCustomSlot="true" v-on:vdropzone-success="uploadSuccess" v-on:vdropzone-error="uploadError" v-on:vdropzone-removed-file="fileRemoved"/>
                </v-menu>
            </v-col>
            <v-col cols="12" sm="12" md="6">
                <v-card-actions>
                    <v-spacer class="hidden-md-and-down"></v-spacer>

                    <v-btn color="blue darken-1" text @click="close">
                        Cancelar
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save"  :loading="gris" :disabled="gris || todaviano">
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-col>
        </v-row>

        <!-- Crear Contacto -->
        <v-dialog v-model="createContactDialog" max-width="600px">
            <createContact v-bind:company="quotation.company_id" @closeCreateDialogContact="closeCreateDialogContact"/>
        </v-dialog>
        <!-- Crear empresa -->
        <v-dialog v-model="createCompanyDialog" max-width="700px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn bottom color="#e25200" dark fab fixed right v-bind="attrs" v-on="on">
                <v-icon color="white">  mdi-plus </v-icon>
            </v-btn> 
          </template>
          <createCompany @closeCreateDialogCompany="closeCreateDialogCompany"/>
        </v-dialog>
        <v-snackbar :color="snackbar.color" v-model="snackbar.show">
            {{ snackbar.message }}
        </v-snackbar>
    </v-card>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import CreateContact from "../clients/contacts/create"
import CreateCompany from "../clients/companies/create"
import axios from "axios";
    export default {
        props:{
            message:Object
        },
        components: {
            vueDropzone: vue2Dropzone,
            'createContact':CreateContact,
            'createCompany':CreateCompany,
        },   
        data: () => ({
            snackbar: {
                show: false,
                message: null,
                color: null
            },
            colorFile: 'black',
            gris:false,
            company:'',
            status:'',
            datePicker:'',
            datePicker2:'',
            createContactDialog: false,
            createCompanyDialog: false,
            dropzoneOptions: {
                url: process.env.VUE_APP_BACKEND_ROUTE + "api/v1/quotation/files",
                addRemoveLinks: true,
                maxFiles: 1
            },
            series:['Serie A',  'Serie B'],
            quotation:{
                //quotation_phase_id:'',
                company_id:null,
                contact_id:'',
                user_id:'',
                pdf:'',
                note:'',
                items:[{
                    quantity:1,
                    item:'',
                    price:'',

                    //value:'',
                    //weight:'',
                    //cost:'',
                }],
                bar:false,
                status:'quotation',
                subtotal:'',
                date:'',
                type:'',
                iva:'',
                total:'',
                invoice:'',
                printed:'',
                created_by_user_id:'',
                last_updated_by_user_id:'',
                invoice_date:'',
                due_date:''
            },
            rules: {
                required: value => !!value || 'Campo requerido',
            },
            valid: true,
        }),
    computed: {
        todaviano(){
            if(this.quotation.company_id!=null&&this.quotation.user_id!=null&&this.quotation.type!=''){
                if(this.quole=='Venta'&&this.quotation.date!=''){
                    return false
                }else if(this.quole=='Cotizaci??n'&&this.quotation.due_date!=''){
                    return false
                }else{
                    return true
                }
            }else{
                return true
            }
        },
        companyLists(){
            return this.$store.state.company.companies;
        },
        contactLists(){
            if(this.quotation.company_id!=null){
                return this.$store.state.contact.contacts.filter(contact=>contact.company_id == this.quotation.company_id);
            }
        }, 
        usersLists(){
            return this.$store.state.user.users;
        }, 
        itemLists(){
            return this.$store.state.item.items.filter(item=>item.is_published == true).filter(item=>item.product_type != 'Variable').map(id=>{
                return{
                    id:id.id,
                    name:id.name,
                    detail: id.name + ' (' + this.categories(id.categories) + ')',
                    categories:id.categories,
                    inventory:this.inventoryCalc(id.id),
                    price:id.price,
                    weight:id.weight
                }
            });
        },
        totalQuotation(){
            var total=0
            if(this.quotation.items.length!=0){
            for(var i=0; i<this.quotation.items.length; i++){
                if(this.quotation.items[i].price!=undefined){
                    total = total+(this.quotation.items[i].price*this.quotation.items[i].quantity)
                }
            }
            return total
            }
        }, 
        currentUser:{
            get(){
                return this.$store.state.currentUser.user
            }
        },
        quole(){
            if(this.status=='vendido'){
                return 'Venta'
            }else if(this.status=='quotation'){
                return 'Cotizaci??n'
            } 
        } 
    },
    created(){
        this.company=this.message[0]
        this.status=this.message[1]
        if(this.company!=undefined){
            this.quotation.company_id=Number(this.company)
        }
        
    },
    methods: {
        inventoryCalc(id){
            var quantities = this.$store.state.inventory.inventories.filter(inventory=>inventory.item_id == id)
            var sum = 0
            for(var i=0; i<quantities.length; i++){
                if(quantities[i].type == 'Salida Producci??n' || quantities[i].type == 'Salida Venta' || quantities[i].type == 'Devoluci??n'){
                    sum = sum - quantities[i].quantity
                }
                else if(quantities[i].type == 'Entrada Producci??n' || quantities[i].type == 'Entrada Compra' || quantities[i].type == 'Ajuste Manual' || quantities[i].type == 'Creaci??n de Producto' || quantities[i].type == 'Ajuste Inventario F??sico' || quantities[i].type == 'Corte Ceros'){
                    sum = sum + quantities[i].quantity
                }
            }
            return sum
        },
        yanohay(quantity, item_id, index){
            var perro = false
            if(item_id!=undefined && item_id!='' && item_id!=null){
                var inventory = this.itemLists.filter(item=>item.id == item_id).map(item=>item.inventory)[0][0]
                if(quantity>=inventory){
                    perro = true
                    this.quotation.items[index].quantity = inventory
                }
            }
            return perro
        },
        categories(categories){
            var respuesta = ''
            for(var i=0; i<categories.length; i++){
                if(i>0){
                    respuesta = respuesta + ', ' + this.categoryName(categories[i])
                }
                else{
                    respuesta = this.categoryName(categories[i])
                }
            }
            return respuesta
        },
        categoryName(id){
            return this.$store.state.category.categories.filter(category => category.id == id).map(category => category.name)[0];
        },
        permissions(permission){
            if(this.currentUser.id==1){
                return true
            }else if(this.currentUser.permissions!=undefined){
                if(this.currentUser.permissions.includes(permission)){
                    return true
                }else{
                    return false
                }
            }else{
                return false
            }
        },
        uploadSuccess(file, response) {
            console.log('File Successfully Uploaded with file name: ' + response.file);
            this.fileName = response.file;
            this.quotation.pdf = this.fileName;
            this.colorFile = 'success'
        },
        uploadError(file, message) {
                this.snackbar = {
                    message: 'No se puedo cargar el archivo',
                    color: 'error',
                    show: true
                }
                this.colorFile = 'error'
            },
        fileRemoved() {
            
        },
        sugestedValue(id) {
            return this.itemLists.filter(item => item.id == id).map(item => item.price)[0];
        },
        add(index) {
            this.quotation.items.push({ quantity: 1, item: '', price:'' });
        },
        remove(index) {
            this.quotation.items.splice(index, 1);
        },
        close () {
            this.gris = false
            this.quotation = Object.assign({}, this.defaultItem)
            this.quotation.company_id=null
            this.quotation.status='quotation'
            this.quotation.items=[{
                quantity:1,
                item:'',
                price:'',

                //value:'',
                //weight:'',
                //cost:'',
            }]
            if(this.company!=undefined){
                this.quotation.company_id=Number(this.company)
            }
            this.$nextTick(() => {
                this.$emit("closeCreateDialogQuotation", false);
            })
        },
        save(){
            /*
            for(var i=0; i<this.quotation.items.length; i++){
                this.quotation.items[i].weight = this.itemLists.filter(item=>item.id == this.quotation.items[i].item).map(item=>item.weight)[0]*this.quotation.items[i].quantity
                this.quotation.items[i].value = this.itemLists.filter(item=>item.id == this.quotation.items[i].item).map(item=>item.price)[0]
                this.quotation.items[i].cost = this.itemLists.filter(item=>item.id == this.quotation.items[i].item).map(item=>item.cost)[0]
            }
            */
            this.gris = true
            this.quotation.created_by_user_id = this.currentUser.id
            this.quotation.last_updated_by_user_id = this.currentUser.id
            if(this.quotation.type == 'Serie A'){
                this.quotation.iva = this.quotation.subtotal*.16
                this.quotation.total = this.quotation.subtotal*1.16
            }else if(this.quotation.type == 'Serie B'){
                this.quotation.iva = this.quotation.subtotal*.16
                this.quotation.total = this.quotation.subtotal*1.16
            }
            this.quotation.status = this.status
            this.$nextTick(() => {
                axios.post(process.env.VUE_APP_BACKEND_ROUTE + "api/v2/sales",Object.assign(this.quotation)).then(response=>{
                    this.$store.dispatch('quotation/getQuotations')
                }).catch(error => {
                    this.snackbar = {
                        message: error.response.data.message,
                        color: 'error',
                        show: true
                    }
                    this.gris = false
                })
                this.$nextTick(() => {
                    this.close()
                })
            })
        },
        closeCreateDialogContact: function(params) {
            this.createContactDialog = params;
            this.$store.dispatch('contact/getContacts')
        },
        closeCreateDialogCompany: function(params) {
            this.createCompanyDialog = params;
            this.$store.dispatch('company/getCompanies')
        },
    },
}
</script>
<style lang="css" scoped>
.v-text-field >>> label{
    font-size: 14px!important;
}
</style>
<style>
.v-input__icon--prepend-inner i::before {
    font-size: 18px!important;
    color:#1976D2;
}
.v-text-field input, .v-label {
    font-size: 14px;
}
.v-picker__title.primary{
    display:none;
}
</style>