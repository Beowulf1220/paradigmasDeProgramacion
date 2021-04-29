const myList = document.getElementById("myList");
const URL = "https://jsonplaceholder.typicode.com/photos";

fetch(URL)
    .then(response => response.json())
    .then(posts => {
        posts.map(post => {
            let li = document.createElement("li");
            li.innerHTML = `<a href="detalle.html?id=${post.id}">${post.id}</a> ${post.title}`;
            myList.appendChild(li);
        })
    })