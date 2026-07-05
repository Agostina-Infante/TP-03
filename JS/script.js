//Ejercicios 1 y 2:mostrar usuarios por consola
const Ul=document.getElementById('DivUsuarios');
const ListaFiltro=document.getElementById('listaUsuarios');

let UsuariosCard = []; //Esta variable la uso como global para guardar los usuarios

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data=>{ //Data es el .JSON, lo recorremos con el for. Al recorrerlo, pedimos que los que sea nombre y email se guerde en una variable.
        console.log("Todos los usuarios recibidos:", data);

        data.forEach((usuarios, i)=>{ //Agregué el parametro i para tener un contador.
            const Nombre = usuarios.name;
            const Email = usuarios.email;
            const Telefono = usuarios.phone;
            const Ciudad = usuarios.address.city;
            console.log(`Procesando usuario ${i + 1}:`, { Nombre, Email, Telefono, Ciudad });
            //creo un contenedor para que cada usuario aparezca con datos ordenados de forma específica.
            const ContenedorUsuario=document.createElement('div');
            ContenedorUsuario.className = "ContUsuario";
            
            const Titulo = document.createElement('h3'); //(titulo)
            Titulo.className = "Titulo";
            Titulo.textContent = `Usuario ${i + 1}`; //uso parametro i

            //Primero viene un ul, que va a tener "enganchados" tanto el nombre como el mail.
            const ListaDatos = document.createElement('ul');
            ListaDatos.className = "Lista";

            //Las li que van abajo tienen los datos.
            const NomUsuario=document.createElement('li');
            NomUsuario.className="DatosUsuario nomfiltro";

            const NomUsuarioFiltro = document.createElement('li');
            NomUsuarioFiltro.className = "nomfiltro"; 
            NomUsuarioFiltro.textContent = Nombre;

            const EmailUsuario=document.createElement('li');
            EmailUsuario.className="DatosUsuario";
            NomUsuario.textContent=`Nombre: ${Nombre}`;
            EmailUsuario.textContent=`Email: ${Email}`;

            const TelUsuario = document.createElement('li');
            TelUsuario.className = "DatosUsuario";
            TelUsuario.textContent = `Teléfono: ${Telefono}`;

            const CiudUsuario = document.createElement('li');
            CiudUsuario.className = "DatosUsuario";
            CiudUsuario.textContent = `Ciudad: ${Ciudad}`;

            ListaDatos.appendChild(NomUsuario);
            ListaDatos.appendChild(EmailUsuario);
            ListaDatos.appendChild(CiudUsuario);
            ListaDatos.appendChild(TelUsuario);
            ListaFiltro.appendChild(NomUsuarioFiltro);
            ContenedorUsuario.appendChild(Titulo);
            ContenedorUsuario.appendChild(ListaDatos);
            Ul.appendChild(ContenedorUsuario);
            })

        /* 
        for(let i=0; i<data.length;i++){
            const Nombre = data[i].name;
            const Email = data[i].email;
            const NuevoUsuario=document.createElement('li');
            NuevoUsuario.textContent=("Nombre: "+Nombre+", Email: "+Email);
        }
        */
    })

//Ejercicio 3: filtro
const Input=document.getElementById('inputFiltro');

Input.addEventListener('keyup', e=>{
    console.log(e.target.value); /* Esto hace q te devuelva la cosnola lo q pusiste en el buscador en tiempo real*/
    if (e.target.matches('#inputFiltro')){
        if (e.key == "Escape")e.target.value=""
        document.querySelectorAll('.nomfiltro').forEach(elemento=>{ /*te devuelve un arreglo con todos los elementos del html q tenga un nombre de lista */
            elemento.textContent.toLowerCase().includes(e.target.value.toLowerCase()) /* includes compara el elemento q ya esta con lo q estoy escribiendo */
            ?elemento.classList.remove('filtro') /*En el caso de q lo q hay en el buscador coinicde con lo q hay en la lista, se remueve la clase filtro */
            :elemento.classList.add('filtro'); /*En caso de que no coincida, le aplica la clase filtro*/
        })
    }
});

//Ejercicio 4: 

//En este evento se hace lo mismo pero para mostrar los datos de el usuario que se 
// puso en el buscador del filtro :)
Input.addEventListener('keyup', e => {
    if (e.key === "Escape") e.target.value = "";
        const textoBusqueda = e.target.value.toLowerCase();
        const tarjetas = document.querySelectorAll('.ContUsuario');
    tarjetas.forEach(tarjeta => {
        // Buscamos el elemento que tiene el nombre dentro de ESTA tarjeta
        const nombreElemento = tarjeta.querySelector('.nomfiltro').textContent.toLowerCase();
        if (nombreElemento.includes(textoBusqueda)) {
            tarjeta.style.display = "block";
        } else {
            tarjeta.style.display = "none";
        }
    });
});

//Ejercicio 5:

function EnviarUsuario(nombre, email) {
    const nuevoUsuario = {name: nombre, email: email};
    fetch('https://jsonplaceholder.typicode.com/users', { //De hecho la api no se guarda para siempre, pero hace una simulación
        method: 'POST', // Le decimos que es unmetodo post
        body: JSON.stringify(nuevoUsuario), //No me acuerdo que lo hayamos visto, pero usé stringify
        headers: {
            'Content-type': 'application/json; charset=UTF-8', // le avisamos al servidor que le enviamos un JSON
        },
    })
    .then(response => response.json()) //Resultado
    .then(data => {
        // Mostramos en la consola lo que el servidor recibió
        console.log('Se ha enviado el usuario', data);
        alert(`Usuario creado!! ID asignado por el servidor: ${data.id}`);
    })
    .catch(error => {
        console.error('Hubo un error al enviar:', error);
    });
    
}

const InputNombre = document.getElementById('InputNombre');
const InputEmail = document.getElementById('InputEmail');
const btnEnviar = document.getElementById('btnEnviar');

btnEnviar.addEventListener('click', () => {
    const nombreVal = InputNombre.value.trim();
    const emailVal = InputEmail.value.trim();
    if (nombreVal === "" || emailVal === "") {
        alert("Por favor, completa ambos campos (Nombre y Email) antes de enviar.");
        return;
    }
    EnviarUsuario(nombreVal, emailVal);
    InputNombre.value = "";
    InputEmail.value = "";
});
//EnviarUsuario('Hola hola', 'soyagos@email.com');