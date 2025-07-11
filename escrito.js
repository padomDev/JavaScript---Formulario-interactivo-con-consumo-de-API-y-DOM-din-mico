let miFormulario = document.getElementById("miFormulario");

miFormulario.addEventListener("submit", function (e) {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();

    if (nombre === "") {
        mensaje1.textContent = "Todos los campos son obligatorios.";
        mensaje1.style.color = "red";
    } else {
        mensaje1.textContent = "Datos enviados correctamente. ¡Gracias!";
        mensaje1.style.color = "green";

    }
});

//  Evento keyup para mostrar en tiempo real lo que escribe el usuario en "nombre"
let inputNombre = document.getElementById("nombre");
let previewNombre = document.getElementById("previewNombre");

inputNombre.addEventListener("keyup", function () {
    previewNombre.textContent = "Nombre actual: " + inputNombre.value;
});

let boton = document.getElementById("boton");
let solicitudUsuario = document.getElementById("solicitud");


boton.addEventListener("click", function () {
    let confirmacion = confirm("Estimad@ " + inputNombre.value + ", desea realiazr una consulta a la API?");

    if (confirmacion === false) {
        solicitudUsuario.textContent = "Gracias " + inputNombre.value + "! Esperamos verte en breve!";
    } else {
        let elemento = document.createElement("button");
        let elemento2 = document.createElement("button");

        elemento.textContent = "Realizar consulta";
        elemento2.textContent = "Mostrar informacion";

        solicitudUsuario.appendChild(elemento);
        solicitudUsuario.appendChild(elemento2);

        elemento.addEventListener("click", () => {


            let table = crearTablaX6();

            getUsers().then(usuarios => {

                for (let usuario of usuarios) {
                    let fila2 = document.createElement("tr");

                    let celda1 = document.createElement("td");
                    celda1.textContent = usuario.name;
                    celda1.classList.add("Celda");

                    let celda2 = document.createElement("td");
                    celda2.textContent = usuario.username;
                    celda2.classList.add("Celda");

                    let celda3 = document.createElement("td");
                    celda3.textContent = usuario.email;
                    celda3.classList.add("Celda");

                    let celda4 = document.createElement("td");
                    celda4.textContent = `${usuario.address.street} ${usuario.address.suite} ${usuario.address.city}`;
                    celda4.classList.add("Celda");

                    let celda5 = document.createElement("td");
                    celda5.textContent = usuario.phone.slice(0, 14);
                    celda5.classList.add("Celda");

                    let celda6 = document.createElement("td");
                    celda6.textContent = usuario.website;
                    celda6.classList.add("Celda");

                    fila2.appendChild(celda1);
                    fila2.appendChild(celda2);
                    fila2.appendChild(celda3);
                    fila2.appendChild(celda4);
                    fila2.appendChild(celda5);
                    fila2.appendChild(celda6);

                    table.appendChild(fila2);

                }



            });
        });

        elemento2.addEventListener("click", () => {

            let table2 = crearTablaX3();

            // Pedir users y posts en paralelo
            Promise.all([getUsers(), getPosts()]).then(([usuarios, posts]) => {

                for (let usuario of usuarios) {
                    let fila2 = document.createElement("tr");

                    // Buscar el PRIMER post del usuario
                    let primerPost = posts.find(p => p.userId === usuario.id);

                    let celda1 = document.createElement("td");
                    celda1.textContent = usuario.name;
                    celda1.classList.add("Celda");

                    let celda2 = document.createElement("td");
                    celda2.textContent = primerPost ? primerPost.title : "Sin post";
                    celda2.classList.add("Celda");

                    let celda3 = document.createElement("td");
                    celda3.textContent = primerPost ? primerPost.body : "Sin post";
                    celda3.classList.add("Celda");

                    fila2.appendChild(celda1);
                    fila2.appendChild(celda2);
                    fila2.appendChild(celda3);

                    table2.appendChild(fila2);
                }

            });

        });


    }
});



function getUsers() {
    return fetch("https://jsonplaceholder.typicode.com/users")
        .then(respuesta => respuesta.json()) // Convertimos a JSON
        .then(usuarios => {
            console.log(usuarios);
            return usuarios; // Array de usuarios
        })
        .catch(error => {
            console.log("Error en la petición: " + error);
        });
}

function getPosts() {
    return fetch("https://jsonplaceholder.typicode.com/posts")
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos);
            return datos;
        })
        .catch(error => {
            console.log("Error en la petición: " + error);
        });
}


function getComments() {
    return fetch("https://jsonplaceholder.typicode.com/comments")
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos);
            return datos;
        })
        .catch(error => {
            console.log("Error en la petición: " + error);
        });
}


function crearTablaX6() {

    let divTable = document.getElementById("divTable");

    let table = document.createElement("table");
    table.classList.add("divTable");

    let fila = document.createElement("tr");
    fila.classList.add("Fila");

    let celda = document.createElement("td");
    let celda2 = document.createElement("td");
    let celda3 = document.createElement("td");
    let celda4 = document.createElement("td");
    let celda5 = document.createElement("td");
    let celda6 = document.createElement("td");

    divTable.appendChild(table);

    table.appendChild(fila);

    fila.appendChild(celda);
    celda.textContent = "Name";
    celda.classList.add("Celda");
    fila.appendChild(celda2);
    celda2.textContent = "User name";
    celda2.classList.add("Celda");
    fila.appendChild(celda3);
    celda3.textContent = "Email";
    celda3.classList.add("Celda");
    fila.appendChild(celda4);
    celda4.textContent = "Address";
    celda4.classList.add("Celda");
    fila.appendChild(celda5);
    celda5.textContent = "Phone";
    celda5.classList.add("Celda");
    fila.appendChild(celda6);
    celda6.textContent = "Website";
    celda6.classList.add("Celda");

    return table;
}

function crearTablaX3() {

    let divTable2 = document.getElementById("divTable2");

    let table2 = document.createElement("table"); // <<< CORREGIDO

    table2.classList.add("divTable");

    let fila = document.createElement("tr");
    fila.classList.add("Fila");

    let celda = document.createElement("td");
    let celda2 = document.createElement("td");
    let celda3 = document.createElement("td");

    divTable2.appendChild(table2);

    table2.appendChild(fila);

    fila.appendChild(celda);
    celda.textContent = "User";
    celda.classList.add("Celda");

    fila.appendChild(celda2);
    celda2.textContent = "Title";
    celda2.classList.add("Celda");

    fila.appendChild(celda3);
    celda3.textContent = "Body";
    celda3.classList.add("Celda");

    return table2;
}
