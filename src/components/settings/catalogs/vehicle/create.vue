<template>    
    <v-card>
        <!-- Titulo del dialogo -->
        <v-card-title>
            Agregar Vehiculo
        </v-card-title>
        <v-divider></v-divider>
            <!-- Formulario -->
        <v-form ref="form">
            <v-row class="py-3 px-6">
                <v-col cols="12" sm="6" md="4">
                    <v-text-field :rules="[v => !!v || 'Campo requerido']" v-model="editedItem.name" label="Nombre"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field :rules="[v => !!v || 'Campo requerido']" v-model="editedItem.max_weight_capacity" suffix="kgs" label="Peso Máximo"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-card-actions class="pt-4">
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                        <v-btn color="blue darken-1" text :loading="gris" :disabled="gris || !valid" @click="save">Guardar</v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </v-form>
        <v-snackbar :color="snackbar.color" v-model="snackbar.show">
            {{ snackbar.message }}
        </v-snackbar>
    </v-card>
</template>
<script>
import axios from "axios";
export default {
    data:()=>({  
        valid: true,
        editedItem: {
            name:'',
            max_weight_capacity:''
        },
        rules: {
            required: value => !!value || 'Campo requerido',
        },
        snackbar: {
            show: false,
            message: null,
            color: null
        },
        gris:false,
    }),
    methods:{
        close () {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.gris = false
            this.$nextTick(() => {
                this.$emit("closeDialogVehicle", false);
            })
        },
        save () {
            axios.patch(process.env.VUE_APP_BACKEND_ROUTE + "api/v2/vehicles",Object.assign(this.editedItem)).then(response=>{
                this.close()
            }).catch(error => {
                this.snackbar = {
                    message: error.response.data.message,
                    color: 'error',
                    show: true
                }
                this.gris = false
            })
            
        },
    }
}
</script>