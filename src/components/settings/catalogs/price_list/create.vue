<template>    
    <v-card>
        <!-- Titulo del dialogo -->
        <v-card-title>
            Crear Lista de Precios
        </v-card-title>
        <v-divider></v-divider>
            <!-- Formulario -->
        <v-form ref="form">
            <v-row class="py-3 px-6">
                <v-col cols="12" sm="6" md="4">
                    <v-text-field :rules="[v => !!v || 'Campo requerido']" v-model="editedItem.item" label="Lista de Precios"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="8">
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
        snackbar: {
            show: false,
            message: null,
            color: null
        },
        gris:false, 
        valid: true,
        editedItem: {
            item:'',
        },
        rules: {
            required: value => !!value || 'Campo requerido',
        },
    }),
    methods:{
        close () {
            this.gris = false
            this.editedItem = Object.assign({}, this.defaultItem)
            this.$nextTick(() => {
                this.$emit("closeDialogPriceList", false);
            })
        },
        save () {
            axios.post(process.env.VUE_APP_BACKEND_ROUTE + "api/v1/price_list/create",Object.assign(this.editedItem)).then(response=>{
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