let lista = document.getElementById("lista");

let names = [];//['Carlos Rivera', 'Luis Fernadno', 'Melissa Garcia'];

const showNames = () => names.map(name => {
    let listItem = document.createElement("li");
    listItem.innerHTML = name;
    lista.appendChild(listItem);
})

const addValue = () =>{
    let value = document.getElementById("valor");
    lista.innerHTML = "";
    names.push(value.value);
    console.log(names);
    showNames();
    value.value = "";
}
showNames();