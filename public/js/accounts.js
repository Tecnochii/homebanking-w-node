const app = Vue.createApp({

    data() {
        return {
            clientes: [],
            name: "",
            lname: "",
            accounts: [],
            loans: [],
            loansType: [],
            currentClient: "",
        }

    },

    created() {

        this.currentClient = this.getCookie("client")
        console.log(this.currentClient)
        axios.get("/api/clients/" + this.currentClient)
            .then(response => {
                console.log(response)
                this.clientes = response.data.client
                this.name = this.clientes.first_name
                this.lname = this.clientes.last_name
                this.accounts = this.clientes.accounts
                this.accounts.sort((a, b) => a.id - b.id)
                this.accounts = this.accounts.filter(account => account.status == true)

                console.log(this.accounts)

                this.loans = response.data.client.client_loans
                this.loans.sort((a, b) => a.id - b.id)
                console.log(this.loans)
            })
            .catch(error => {
                alert(error)
            })

        axios.get("/api/loans")
            .then(response => {
                this.loansType = response.data.filter(e => e)

                console.log(this.loansType)
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
        AddAccount(type) {
            axios.post('/api/accounts', { clientid: this.currentClient, accountType: type }, {
                headers: { 'content-type': 'application/json' }
            })
                .then(location.reload())
        },
        deleteAccount(id) {
            axios.delete("/api/accounts/" + id)
                .then(location.reload())

        },
        accounTransactionCookie(id) {
            document.cookie = "transaction=" + id
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
        getLoanType(loanid) {

            if (loanid == 12) {
                return "Hipotecario"
            }
            else if (loanid == 13) {
                return "Personal"

            }
            else if (loanid == 14) {
                return "Automotriz"

            }
        }
    },
    computed: {

    }

})


app.mount("#app")

function saltarA(id, tiempo) {
    var tiempo = tiempo || 1000;
    $("html, body").animate({ scrollTop: $(id).offset().top }, tiempo);
}