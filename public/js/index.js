
const app = Vue.createApp({

    data() {
        return {
            email: "",
            emailLog: "",
            pwd: "",
            pwdLog: "",
            Name: "",
            lName: "",
        }

    },

    created() {


    },
    methods: {
        login() {

            console.log("entro")

            axios.post('/api/auth/signIn', { email: this.emailLog, password: this.pwdLog }, {
                headers: { 'content-type': 'application/json' }
            })
                .then(response => {
                    if (response.data == "client not exist or wrong password ") {
                        swal(response.data);
                    }
                    else {
                        window.location.href = "/accounts"
                    }
                })

        },
        completarRegistro() {
            axios.post('/api/clients',
                {
                    first_name: this.Name,
                    last_name: this.lName,
                    password: this.pwd,
                    email: this.email
                })
                .then(response => {
                    console.log('registered')

                    axios.post('/api/auth/signIn', { email: this.email, password: this.pwd }, {
                        headers: { 'content-type': 'application/json' }
                    })
                        .then(response => {

                            window.location.href = "/accounts"
                        })
                }).then(response => console.log(response))
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

