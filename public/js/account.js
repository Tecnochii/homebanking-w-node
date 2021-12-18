const app = Vue.createApp({



    data() {
        return {
            clientes: [],
            name: "",
            lname: "",
            accounts: [],
            transactions: "",
            transactionId: "",
            account: "",
            currentClient: ""
        }

    },

    created() {



        this.account = this.getCookie("transaction")
        this.currentClient = this.getCookie("client")
        console.log(this.currentClient)


        axios.get("/api/transactions/" + this.account)
            .then(response => {
                console.log(response)
                this.transactions = response.data
                this.transactions.sort((a, b) => b.id - a.id)
                this.accounts = response.data
                console.log(this.transactions)
            })
            .catch(error => {
                alert(error)
            })

        axios.get("/api/clients/" + this.currentClient)
            .then(response => {
                console.log(response)
                this.clientes = response.data
                this.name = this.clientes.first_name
                this.lname = this.clientes.last_name
                this.accounts = this.clientes.accounts

                console.log(this.accounts)
            })
            .catch(error => {
                res.data
            })


    },
    methods: {
        logout() {
            axios.post('/api/logout')
                .then(response => window.location.href = "/index.html")
                .catch(e => {
                    swal("Not logged");
                });
        },
        getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }
    }
})


app.mount("#app")