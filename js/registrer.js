const usuarios = [{
    nombre: 'lucia',
    mail: 'luciiadn@mail.com',
    pass: 'lucia123'
},{
    nombre: 'francisco',
    mail: 'franciscop@mail.com',
    pass: 'francisco123'
},{
    nombre: 'marilina',
    mail: 'mari86@mail.com',
    pass: 'marilina123'
},
]

const medicos = [{
    nombre: "Pagliano, Marilina",
    especialidad: "Médica clínica",
    precioConsulta: 3800,
    
}, {
    nombre: "Sandra Lardone",
    especialidad: "pediatría",
    precioConsulta: 2350,

}, {
    nombre: "Magdalena Vissio",
    especialidad: "Psicología",
    precioConsulta: 1500,
    
}, {
    nombre: "Delfina Tosselli",
    especialidad: "Psicopedagogía",
    precioConsulta: 2000,
    
}]


const inputMailLogin = document.getElementById('emailLogin'),
    inputPassLogin = document.getElementById('passwordLogin'),
    checkRecordar = document.getElementById('recordarme'),
    btnLogin = document.getElementById('login'),
    modalEl = document.getElementById('modalLogin'),
    modal = new bootstrap.Modal(modalEl),
    contTarjetas = document.getElementById('tarjetas'),
    elementosToggleables = document.querySelectorAll('.toggeable');



function validarUsuario(usersDB, user, pass) {
    let encontrado = usersDB.find((userDB) => userDB.mail == user);
    console.log(encontrado)
    console.log(typeof encontrado)

    if (typeof encontrado === 'undefined') {
        return false;
    } else {
        
        if (encontrado.pass != pass) {
            return false;
        } else {
            return encontrado;
        }
    }
}


function guardarDatos(usuarioDB, storage) {
    const usuario = {
        'name': usuarioDB.nombre,
        'user': usuarioDB.mail,
        'pass': usuarioDB.pass
    }

    storage.setItem('usuario', JSON.stringify(usuario));
}

function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}


function recuperarUsuario(storage) {
    return JSON.parse(storage.getItem('usuario'));
}


function saludar(usuario) {
    nombreUsuario.innerHTML = `Bienvenido/a, <span>${usuario.name}</span>`
}


function mostrarInfoMedicos(array) {
    contTarjetas.innerHTML = '';
    array.forEach(element => {
        let html = `<div class="card cardMedicos" id="tarjeta${element.nombre}">
                <h3 class="card-header" id="nombreMedicos"> ${element.nombre}</h3>
                <img src="${element.img}" alt="${element.nombre}" class="card-img-bottom" id="fotoMascota">
                <div class="card-body">
                    <p class="card-text" id="especialidadMedicos">Especie: ${element.especialidad}</p>
                    
                </div>
            </div>`;
        contTarjetas.innerHTML += html;
    });
}


function presentarInfo(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}


function estaLogueado(usuario) {

    if (usuario) {
        saludar(usuario);
        mostrarInfoMedicos(medicos);
        presentarInfo(elementosToggleables, 'd-none');
    }
}


btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

    
    if (!inputMailLogin.value || !inputPassLogin.value) {
        swal("Campo obligatorio", {
            buttons: false,
            timer: 2000,
          });
    } else {
        
        let data = validarUsuario(usuarios, inputMailLogin.value, inputPassLogin.value);

        if (!data) {
            swal("Contraseña no válida", {
                buttons: false,
                timer: 2000,
              });
        } else {

            //Revisamos si elige persistir la info aunque se cierre el navegador o no
            if (checkRecordar.checked) {
                guardarDatos(data, localStorage);
                saludar(recuperarUsuario(localStorage));
            } else {
                guardarDatos(data, sessionStorage);
                saludar(recuperarUsuario(sessionStorage));
            }
            //Recién ahora cierro el cuadrito de login
            modal.hide();
            //Muestro la info para usuarios logueados
            mostrarInfoMedicos(medicos);
            presentarInfo(elementosToggleables, 'd-none');
        }
    }
});

btnLogout.addEventListener('click', () => {
    borrarDatos();
    presentarInfo(elementosToggleables, 'd-none');
});

estaLogueado(recuperarUsuario(localStorage));