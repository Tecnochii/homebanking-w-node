const app = Vue.createApp({

    data() {
        return {
            numberCard: "",
            cvv: "",
            description: "",
            amount: ""
        }

    },

    created() {

    },
    methods: {
        pay() {
            axios.post("/api/payment", {
                number: this.numberCard,
                cvv: this.cvv,
                amount: this.amount,
                description: this.description
            })
                .then(res => console.log("pagado"))
                .then(res => location.reload())
                .catch(res => console.log(res.response.data))
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