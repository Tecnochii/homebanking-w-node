const app = Vue.createApp({

    data() {
        return {
            clientes: [],
            Name: "",
            lName: "",
            datos: "",

            firstName: "",
            lastName: "",
            currentClient: ""
        }

    },

    created() {
        this.currentClient = this.getCookie("client")

        axios.get("/api/clients/" + this.currentClient)
            .then(response => {
                console.log(response)
                this.clientes = response.data._embedded.clients
                this.datos = response.data
                this.firstName = this.clientes.firstName
                this.lastName = this.clientes.lastName
            })
            .catch(error => {
                alert(error)
            })


    },
    methods: {
        deleteData(clientes) {
            console.log(clientes._links.self.href)
            axios.delete(clientes._links.self.href)
            location.reload()
        },

        sendClientData: function () {
            axios.post('/rest/clients/', {
                firstName: this.Name,
                lastName: this.lName,
                email: this.mail
            }).then(response => {
                location.reload()
            }).catch(e => {
                console.log(e);
            });
        },
        logout() {
            axios.post('/api/logout')
                .then(response => window.location.href = "/index.html")
                .catch(e => {
                    swal("Not logged");
                });
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
    }
})


app.mount("#app")