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

        <button type="submit" class="add">
        {{ estatusEditar ? "Editar" : "Agregar" }}
        </button>
        <button
          v-if="estatusEditar"
          @click="(estatusEditar = false), (isbn = '',titulo = '',autor = '')"
        >
          Cancelar
        </button>
      </p>
    </form>

    <img
      src="https://pa1.narvii.com/6707/510b0daee67fbc091f14b9d8ef40aeb6c0d4dc7d_hq.gif"
      v-if="cargando"
    />

    {{ estatusEditar }}

    <ul>
      <il v-for="todo in todos" :key="todo.id">
        {{ todo.isbn }} {{ todo.titulo }} {{ todo.autor }} 
        <button @click="deleteTodo(todo)">Eliminar</button>
        <button @click="selectTodo(todo)">Editar</button>
      </il>
    </ul>
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
      });
      this.isbn = ""
      this.titulo = "";
      this.autor = "";
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
    },
    async updateTodo() {
      await db.collection("todos").doc(this.id).set({
        isbn: this.isbn,
        titulo: this.titulo,
        autor: this.autor,
      });

      this.estatusEditar = false;
      this.id = "";
      this.isbn = "";
      this.titulo = "";
      this.autor = "";
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
  width: 60%;
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
h1{
  color:yellowgreen;
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