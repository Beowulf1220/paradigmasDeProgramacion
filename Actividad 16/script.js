const app = Vue.createApp({

    data(){
        return {
            materia: "Paradigmas de programacion",
            semestre: "sexto",
            carrera: "ICC",
            productos: [
                {nombre: "cerveza", cantidad: 0},
                {nombre: "agua", cantidad: 30},
                {nombre: "vino", cantidad: 10},  
            ],
            producto: ""
        }
    },

    methods: {
        agregarProducto() {

            this.productos.push(
                {nombre: this.producto, cantidad: 0}
            )

            this.producto =""

        }
    },

    computed:{

        voltearTexto() {
            return this.producto.split("").reverse().join("");
        },

        total(){
            return this.productos.reduce((contador, product ) => contador + product.cantidad, 0)
        }
    }

})

const vm = app.mount('#app')