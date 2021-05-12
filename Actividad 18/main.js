const app = Vue.createApp({
    
    data(){
        return{
            usuarios : []
        }
    },

    methods : {
        getUsers(){
            fetch("https://jsonplaceholder.typicode.com/users")
                .then(response => response.json())
                .then(users => { this.usuarios = users })
        }
    }
});

const vm = app.mount("#app");