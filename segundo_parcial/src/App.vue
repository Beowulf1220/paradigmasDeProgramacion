<template>
  <div class="center">
    <h1>Firebase</h1>
    <form @submit.prevent="estatusEditar ? updateTodo() : addTodo()">
      <p>
        
        Isbn:
        <input type="text" v-model="isbn" />
        
        <br/>

        Titulo:
        <input type="text" v-model="titulo" />

        <br/>

        Autor:
        <input type="text" v-model="autor" />

        <br/>

        Portada:
        <input type="text" v-model="portada" />

        <button type="submit" class="add">
        {{ estatusEditar ? "Editar" : "Agregar" }}
        </button>
        <button
          v-if="estatusEditar"
          @click="(estatusEditar = false), (isbn = '',titulo = '',autor = '', portada = '')"
        >
          Cancelar
        </button>
      </p>
    </form>

    <img
      src="https://pa1.narvii.com/6707/510b0daee67fbc091f14b9d8ef40aeb6c0d4dc7d_hq.gif"
      v-if="cargando"
    />

    Editando: {{ estatusEditar }}

    <table>
      <tr>
        <th>Isbn</th>
        <th>Titulo</th>
        <th>Autor</th>
        <th>Portada</th>
        <th>Opciones</th>
      </tr>
      <tr v-for="todo in todos" :key="todo.id">
        <td>{{ todo.isbn }}</td> <td>{{ todo.titulo }}</td> <td>{{ todo.autor }}</td> <td><img v-bind:src="todo.portada" height="200" alt="{{todo.titulo}}"></td>
        <td>
        <button @click="deleteTodo(todo)">Eliminar</button>
        <button @click="selectTodo(todo)">Editar</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { db } from "./firebase";

export default {
  name: "App",
  data() {
    return {
      todos: [],
      id: "",
      isbn: "",
      titulo: "",
      autor: "",
      portada: "",
      cargando: false,
      estatusEditar: false,
    };
  },
  created() {
    this.listarTodos();
  },
  methods: {
    async listarTodos() {
      this.cargando = true;
      const data = await db.collection("todos").get();
      this.todos = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      this.cargando = false;
      console.log(this.todos);
    },
    async addTodo() {
      await db.collection("todos").add({
        isbn: this.isbn,
        titulo: this.titulo,
        autor: this.autor,
        portada: this.portada,
      });
      this.isbn = ""
      this.titulo = "";
      this.autor = "";
      this.portada = "";
      this.listarTodos();
    },
    async deleteTodo(todo) {
      await db.collection("todos").doc(todo.id).delete();
      this.listarTodos();
    },
    selectTodo(todo) {
      this.estatusEditar = true;
      this.id = todo.id;
      this.isbn = todo.isbn;
      this.titulo = todo.titulo;
      this.autor = todo.autor;
      this.portada = todo.portada;
    },
    async updateTodo() {
      await db.collection("todos").doc(this.id).set({
        isbn: this.isbn,
        titulo: this.titulo,
        autor: this.autor,
        portada: this.portada,
      });

      this.estatusEditar = false;
      this.id = "";
      this.isbn = "";
      this.titulo = "";
      this.autor = "";
      this.portada = "";
      this.listarTodos();
    },
  },
};
</script>

<style>
#app {
  font-family: 'Courier New', Courier, monospace;
}
body {
  background: gray;
}
.center {
  margin-top: 10px;
  height: auto;
  width: 80%;
  background: black;
  border-radius: 2%;
}
.add{
  width: 80%;
}
* {
  margin: auto;
  text-align: center;
  color: lime;
  font-family: cursive;
  font-size: 18px;
}
table {
   width: 100%;
   border: 1px solid forestgreen;
}
th, td {
   width: 25%;
   text-align: center;
   border: 1px solid green;
   border-collapse: collapse;
   padding: 0.3em;
   caption-side: bottom;
}
caption {
   padding: 0.3em;
   color: #fff;
    background: #000;
}
th {
   background: black;
}
h1{
  color:burlywood;
  font-size: 200%;
}
ul {
  list-style: none;
  margin-left: 20%;
  margin-right: 20%;
  background: black;
  padding: 5px;
}
button {
  padding: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  color: blanchedalmond;
  background: black;
  border-radius: 5%;
}
input {
  padding: 10px;
  margin: 10px;
  width: 70%;
  color: black;
  font-size: 20px;
  border-radius: 5%;
}
</style>