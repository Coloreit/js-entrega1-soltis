const usuarios = [{
    nombre: 'Evangelina',
    mail: 'eva@mail.com',
    pass: '123456'
},
{
    nombre: 'Agustin',
    mail: 'agus@mail.com',
    pass: '987654'
},
{
    nombre: 'Marta',
    mail: 'martita25@mail.com',
    pass: 'Hola456'
},{
    nombre: 'Mariana',
    mail: 'marianabs@mail.com',
    pass: 'SoyColoreit'
}]

class Producto {

    constructor(nombre, genero, edad, categoria, precio, imagen, id){
        this.nombre = nombre;
        this.genero = genero;
        this.edad = edad;
        this.categoria= categoria;
        this.precio = parseFloat(precio);
        this.imagen = imagen;
        this.id = id;
    }

    asignarId(array){
        this.id = array.length;
    }
}

const productos = [
    new Producto("Body", "Varon", "0 a 3 meses", "Indumentaria", 300, "./images/indumentaria/Body.jpg", 1),
    new Producto("Pantalon", "Varon", "3 a 6 meses", "Indumentaria", 800,"./images/indumentaria/Ranita.jpg", 2),
    new Producto("Batita", "Nena", "3 a 6 meses", "Indumentaria", 600, "./images/indumentaria/Batita.jpg", 3),
    new Producto("Remera", "Nena", "4 años", "Indumentaria", 700, "./images/indumentaria/Remera.jpg", 4),
    new Producto("Mamadera", "Indistinto", "0 a 12 meses", "Accesorios", 1200, "./images/indumentaria/a-mamadera.png", 5),
    new Producto("Chupete", "Indistinto", "0 a 6 meses", "Accesorios", 600, "./images/indumentaria/a-chupete.png", 6),
    new Producto("Encastre", "Indistinto", "0 a 1 año", "Juguetes", 3200,"./images/indumentaria/j-0-1.jpg", 7),
    new Producto("Shampoo", "Indistinto", "0 a 1 año", "Perfumeria", 450, "./images/indumentaria/p-shampoo.png", 8),
    new Producto("Jabon", "Indistinto", "0 a 1 año", "Perfumeria", 350, "./images/indumentaria/p-jabon.png", 9),
]

console.log(productos);

const mailLogin = document.getElementById("emailLogin"),
    passLogin = document.getElementById("passwordLogin"),
    recordar = document.getElementById("recordarme"),
    btnLogin = document.getElementById("login"),
    modalEl = document.getElementById("modalLogin"),
    modal = new bootstrap.Modal(modalEl),
    contTarjetas = document.getElementById("tarjetas"),
    toggles = document.querySelectorAll(".toggles");

function validarUsuario(usersBD, user, pass) {
    let encontrado = usersBD.find((userBD) => userBD.mail == user);
    
    if (typeof encontrado === "undefined") {
        return false;
    } else {
        if (encontrado.pass != pass) {
            return false;
        } else {
            return encontrado;
        }
    }
}

function guardarDatos(usuarioBD, storage) {
    const usuario = {
        "name": usuarioBD.nombre,
        "user": usuarioBD.mail,
        "pass": usuarioBD.pass
    }
    storage.setItem("usuario", JSON.stringify(usuario));
}

function saludar(usuario) {
    nombreUsuario.innerHTML = `Bienvenid@, <span>${usuario.name}</span>`
}

function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}

function recuperarUsuario(storage) {
    let usuarioEnStorage = JSON.parse(storage.getItem("usuario"));
    return usuarioEnStorage;
}

function usuarioLogueado(usuario) {
    if (usuario) {
        saludar(usuario);
        mostrarProductos(productos);
        presentarInfo(toggles, "d-none");
    }
}

function presentarInfo(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}

function mostrarProductos(array) {
    contTarjetas.innerHTML = '';
    array.forEach(element => {
        let html = `<div class="card cardProducto" id="tarjeta${element.nombre}">
                <h3 class="card-header" id="nombreMascota">${element.nombre}</h3>
                <img src="${element.imagen}" alt="${element.nombre}" class="card-img-bottom" id="fotoProducto">
                <div class="card-body">
                    <p class="card-text" id="genero">Genero: ${element.genero}</p>
                    <p class="card-text" id="edad">Edad: ${element.edad}</p>
                    <p class="card-text" id="categoria">Categoria: ${element.categoria}</p>
                    <p class="card-text" id="precio">Precio: ${element.precio} pesos</p>
                </div>
            </div>`;
        contTarjetas.innerHTML += html;
    });
}

btnLogin.addEventListener("click", (e) => {
    e.preventDefault();

    if (!mailLogin.value || !passLogin.value) {
        alert('Todos los campos son requeridos');
    } else {

        let data = validarUsuario(usuarios, mailLogin.value, passLogin.value);

        if (!data) {
            alert(`Usuario y/o contraseña erróneos`);
        } else {

            if (recordar.checked) {
                guardarDatos(data, localStorage);
                saludar(recuperarUsuario(localStorage));
            } else {
                guardarDatos(data, sessionStorage);
                saludar(recuperarUsuario(sessionStorage));
            }
            modal.hide();
            mostrarProductos(productos);
            presentarInfo(toggles, "d-none");
        }
    }
});

btnLogout.addEventListener("click", () => {
    borrarDatos();
    presentarInfo(toggles, "d-none");
});

window.onload = () => usuarioLogueado(recuperarUsuario(localStorage));