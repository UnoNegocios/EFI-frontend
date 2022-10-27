<template>
    <v-container>
        <v-row class="ma-0">
            <v-col cols="4" v-for="(ticket, index) in tickets" :key="index">
                <v-card>
                    <v-card-title></v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            tickets:[],
            total_tickets:0,
            loading:false
        }
    },
    methods:{
        getDataFromApi () {
            this.loading = true
            this.apiCall().then(data => {
                this.total_tickets = data.total
                this.tickets = data.items
                this.loading = false
            })
        },
        apiCall () {
            return new Promise((resolve, reject) => {

            })
        }
    },
    mounted() {
        Echo.channel('test').listen('Test', (e) => {
            console.log(e)
        })
    },
}
</script>