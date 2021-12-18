
const app = Vue.createApp({

    data() {
        return {
            clientes: [],
            name: "",
            lname: "",
            transfer: "",
            loans: [],
            loanid: "",
            loanPayment: "",
            amount: "",
            accounts: "",
            accountDest: "",
            indexLoan: "select",
            currentClient: ""
        }

    },

    created() {
        this.currentClient = this.getCookie("client")

        axios.get("/api/clients/" + this.currentClient)
            .then(response => {
                this.clientes = response.data.client
                this.name = this.clientes.first_name
                this.lname = this.clientes.last_name
                this.accounts = this.clientes.accounts
                this.accounts.sort((a, b) => a.id - b.id)
                this.accounts = this.accounts.filter(account => account.status == true)
                console.log(this.accounts)

            })
            .catch(error => {
                alert(error)
            }),
            axios.get("/api/loans")
                .then(response => {
                    this.loans = response.data.filter(e => e)

                    console.log(this.loans)
                })

    },
    methods: {
        logout() {
            axios.post('/api/logout')
                .then(response => window.location.href = "/index")
                .catch(e => {
                    swal("Not logged");
                });
        },

        completeLoan() {
            axios.post('/api/client/loans',
                { amount: this.amount, payments: this.loanPayment, loanId: this.loanid, clientId: this.currentClient, accountNumber: this.accountDest }, {
                headers: { 'content-type': 'application/json' }
            })

                .then(response => {
                    swal({
                        title: "Created!",
                        icon: "success",

                    })
                    setTimeout(function () { window.location.href = "/accounts" }, 3000)
                })
                .catch(() => console.log('error')
                )
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
        },




    },
    computed: {


        indexLoanSeleccionado() {
            if (this.loanid == 12) {
                this.indexLoan = 0
            } else if (this.loanid == 13) {
                this.indexLoan = 1
            } else if (this.loanid == 14) {
                this.indexLoan = 2
            } else {
                this.indexLoan = "select"
            }
        },

    }
})


app.mount("#app")