//Ejercicios 1 y 2:mostrar usuarios por consola
const Ul=document.getElementById('DivUsuarios');
const ListaFiltro=document.getElementById('listaUsuarios');

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data=>{ //Data es el .JSON, lo recorremos con el for. Al recorrerlo, pedimos que los que sea nombre y email se guerde en una variable.
        
        data.forEach((usuarios, i)=>{ //Agregué el parametro i para tener un contador.
            const Nombre = usuarios.name;
            const Email = usuarios.email;
            //creo un contenedor para que cada usuario aparezca con datos ordenados de forma específica.
            const ContenedorUsuario=document.createElement('div');
            
            const Titulo = document.createElement('h3'); //(titulo)
            Titulo.className = "Titulo";
            Titulo.textContent = `Usuario ${i + 1}`; //uso parametro i

            //Primero viene un ul, que va a tener "engancados" tanto el nombre como el mail.
            const ListaDatos = document.createElement('ul');
            ListaDatos.className = "Lista";

            //Las li que van abajo tienen los datos.
            const NomUsuario=document.createElement('li');
            NomUsuario.className="DatosUsuario";

            const NomUsuarioFiltro = document.createElement('li');
            NomUsuarioFiltro.className = "nomfiltro"; 
            NomUsuarioFiltro.textContent = Nombre;

            const EmailUsuario=document.createElement('li');
            EmailUsuario.className="DatosUsuario";
            NomUsuario.textContent=`Nombre: ${Nombre}`;
            EmailUsuario.textContent=`Email: ${Email}`;
            
            ListaDatos.appendChild(NomUsuario);
            ListaDatos.appendChild(EmailUsuario);
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
    console.log(e.target.value); /* Esto hace q te devuelva lacosnola lo q pusiste en el buscador en tiempo real*/
    if (e.target.matches('#inputFiltro')){
        if (e.key == "Escape")e.target.value=""
        document.querySelectorAll('.nomfiltro').forEach(elemento=>{ /*te devuelve un arreglo con todos los elementos del html q tenga un nombre de lista */
            elemento.textContent.toLowerCase().includes(e.target.value.toLowerCase()) /* includes compara el elemento q ya esta con lo q estoy escribiendo */
            ?elemento.classList.remove('filtro') /*En el caso de q lo q hay en el buscador coinicde con lo q hay en la lista, se remueve la clase filtro */
            :elemento.classList.add('filtro'); /*En caso de que no coincida, le aplica la clase filtro*/
        })
    }
});