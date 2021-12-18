const app = Vue.createApp({


    data() {
        return {
            loanName: "",
            payments: "",
            maxAmount: "",
            fee: ""
        }

    },

    created() {

    },

    methods: {

        createLoan() {
            let fee = this.fee / 100
            console.log(fee)

            axios.post("/api/loan/", "name=" + this.loanName + "&maxAmount=" + this.maxAmount + "&payments=" + this.payments + "&fee=" + fee)
                .then(res => alert("created"))
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
    }
})


app.mount("#app")