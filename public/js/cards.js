const app = Vue.createApp({

    data() {
        return {
            clientes: [],
            name: "",
            lname: "",
            cards: [],
            cardsDebito: [],
            cardsCredito: [],
            showDebit: true,
            showCredit: true,
            type: "",
            color: "",
            currentClient: ""
        }

    },

    created() {

        this.currentClient = this.getCookie("client")

        axios.get("/api/clients/" + this.currentClient)
            .then(response => {
                console.log(response)
                this.clientes = response.data.client
                this.name = this.clientes.first_name
                this.lname = this.clientes.last_name



                this.cards = response.data.client.Cards

                this.cards.sort((a, b) => a.id - b.id)
                console.log(this.cards)
                this.cardsDebito = this.cards.filter(e => e.type == 'Debito')
                console.log(this.cardsDebito)
                this.cardsCredito = this.cards.filter(e => e.type == 'Credito')
                console.log(this.cardsCredito)
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })


    },
    methods: {
        deleteCard(id) {
            axios.delete("/api/cards/" + id)
                .then(setTimeout(function () { window.location.href = "/cards" }, 3000))
        },
        AddCard() {
            axios.post('/api/cards', { cardholder: this.name + " " + this.lname, color: this.color, client_id: this.currentClient, type: this.type },
                {
                    headers: { 'content-type': 'application/json' }
                }
            )
                .then(setTimeout(function () { window.location.href = "/cards" }, 3000)
                )
        },
        fecha(fecha) {
            fecha = fecha.split("").splice(0, 7).join("")
            return fecha
        },


        estaVencida(thruDate) {             //let hoy = new Date(Date.now()).toLocaleString().split(',')[0];  
            let hoy = new Date().toJSON().slice(0, 10).split('-').join('-');
            console.log(hoy)
            if (thruDate.valueOf() < hoy.valueOf()) {
                console.log(hoy, thruDate); return true
            }
        }, getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
    },

})


app.mount("#app")