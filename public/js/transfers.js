const app = Vue.createApp({

    data() {
        return {
            clientes: [],
            name: "",
            lname: "",
            transfer: "",
            accounts: [],
            accountDebit: "",
            accountCredit: "",
            amount: "",
            desc: "",
            accountsFiltradas: [],
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
                this.accounts = this.clientes.accounts
                this.accounts.sort((a, b) => a.id - b.id)
                this.accounts = this.accounts.filter(account => account.status == true)

            })
            .catch(error => {
                alert(error)
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
        transferir() {
            axios.post('/api/transactions', { amount: this.amount, description: this.desc, accountOriginNumber: this.accountDebit, accountToDestNumber: this.accountCredit }, {
                headers: { 'content-type': 'application/json' }
            })

                .then(response => {
                    swal({
                        title: "Transfer!",
                        icon: "success",

                    });
                    location.reload()
                })
                .then(response => window.location.href = "/accounts")
                .catch(err => swal("Error to realize the transaction, please verify the amount"))
        },
        filtrarCuentas() {
            this.accountsFiltradas = this.accounts.filter(e => e.number != this.accountDebit)

        }, getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }


    },


})


app.mount("#app")