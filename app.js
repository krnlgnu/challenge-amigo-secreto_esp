// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
// en la variable nombres se guardaran los nombres con apellido ingresados por el usuario
let listaAmigos = [];
// en este arreglo van a ir almacenados los posibles articulos que algunos nombres pueden tener los cuales van a ser objetos de validacion
const conectores = ["de","del","la","las","los","van","von"];
// esta constante limitara a ingresar un maximo de 4 amigos que el usuario puede ingresar
const numeroMaxAmigos = 5;

const nombreIngresado = document.getElementById('cajaAmigo');
const aviso = document.getElementById('mensaje');
const btnAgregar = document.getElementById('botonAgregar');
const btnSortear = document.getElementById('botonSortear');
const lista = document.getElementById('listaAmigos');

// esta funcion de validacion revisara que haya un nombre escrito correctamente

function validacionNombreApellido(nombre) {
    /* esta variable dividira el nombre ingresado en partes dividido por 
    los espacios que haya entre los elementos ingresados por el usuario
    */
    const partesDelNombre = nombre.trim().split(/\s+/).filter(Boolean);;
    /* Este condicional verifica si el nombre ingresado tiene menos de dos partes,
    por lo que si no hay nada despues de lo primero escrito, entonces el apellido es inexistente
    se hace uso de un objeto literal para evitar inicializar tantas variables y devolver multiples valores a la vez,
    este objeto tendra dos propiedades: "valido" como bandera para detener el resto la comprobacion y
    "mensaje" que dara un texto que despues sera usado manipulando el DOM para mostrar una advertencia
    cuando el usuario no ingrese un nombre sin apellido. */

    if (partesDelNombre.length === 0) {
    return{ valido: false, mensaje:  "⚠️ No has escrito ningun nombre y ningun apellido" };
    }
    if (partesDelNombre.length < 2){
    return{ valido: false, mensaje: "❌ Falta el apellido"};
    }
    //Esta variable tomara el primer elemento del nombre ingresado como el nombre de pila
    const nombreDePila = partesDelNombre[0];
    //Esta variable tomara el ultimo elemento del nombre ingresado como el apellido
    const apellido = partesDelNombre[partesDelNombre.length - 1];
     /* Este condicional verifica si el nombre ingresado tiene menos de 2 caracteres,
    por lo que el usuario tendra que ingresar un nombre que tenga al menos 2 caracteres
    si quiere continuar ingresando amigos */
    if(nombreDePila.length < 2){
    return {valido: false, mensaje: "❌ El nombre es muy corto"};
    }
    /*este condicional verifica si el apellido ingresado tiene menos de 2 caracteres, y ademas
    si se escribe un conector que no este dentro de los conectores permitidos que estan incializados 
    en la variable "conectores" tambien arrojara un error por lo que el usuario tendra que ingresar
    un apellido que tenga al menos 2 caracteres con un conector valido si quiere continuar ingresando amigos */
    if(apellido.length < 2 && !conectores.includes(apellido.toLowerCase())){
    return {valido: false, mensaje: "❌ Apellido muy corto"};
    }
    /* si luego de pasar todas las anteriores comprobaciones la bandera de valido sera veradera esta vez
    y se mandara un mensaje satisfactorio de que el nombre ingresado fue correcto. */
    return {valido: true, mensaje: `✅ Se agregó a ${nombreDePila} a la lista. `} ;

}

/* Esta funcion sirve para añadir mayusculas al principio de los nombres y apellidos introducidos,
algo muy normalizado en los nombres propios occidentales. Se excluye  capitalizar
los conectores porque solo es valido para tratamientos especiales. Tambien se implementó
esta funcion para comodidad del usuario, ya que no todos los teclados predictivos de sistemas operativos moviles
capitalizan y mucho menos hay asistencia de capitalizacion en sistemas operativos de escritorio */
function capitalizarNombre(nombre) {
  return nombre
    .trim()
    .split(/\s+/)
    .map(palabra => {
      const p = palabra.toLowerCase();
      if (conectores.includes(p)) return p;
      return p.charAt(0).toUpperCase() + p.slice(1);
    })
    .join(" ");
}

function agregarAmigo() {
    const nombreNormalizado = capitalizarNombre(nombreIngresado.value);
    const nombreValidado = validacionNombreApellido(nombreNormalizado);

     if (!nombreValidado.valido) {
        aviso.textContent = nombreValidado.mensaje;
        return;
     }

     if (listaAmigos.includes(nombreNormalizado)) {
        aviso.textContent = "❌ El nombre ya fue ingresado, ingrese un nombre diferente.";
        return;
     }

     
     listaAmigos.push(nombreNormalizado);
    // El mensaje muestra que el amigo fue agregado correctamente
     aviso.textContent = `${nombreValidado.mensaje} llevas ${listaAmigos.length} de ${numeroMaxAmigos} agregados. Agrega otro amigo`;
     // Se agrega el nombre validado y normalizado al Arreglo listaAmigos
     // Se actualiza la lista de amigos en el elemento ul listaAmigos
     lista.innerHTML += `<li>${nombreNormalizado} </li>`;
     // Se limpia la caja de texto cajaAmigo por usabilidad
     nombreIngresado.value = "";

    /* esta condicion valida que cuando se hayan ingresado el numero maximo de amigos pemitidos se deshabilite el boton Agregar
     y se habilite el boton Sortear amigo */
     if (listaAmigos.length == numeroMaxAmigos) {
      aviso.textContent = "Ya has agregado a todos los amigos permitidos. Ahora da clic en Sortear amigo para conocer al amigo secreto."
      btnAgregar.disabled = true;
      btnSortear.disabled = false;
     }
}


/* esta funcion es la que realiza el sorteo de los amigos. Deshabilita el boton
Sortear amigo para impedir que elija otro amigo del que ya fue elegido */
function sortearAmigo() {
  const indice = Math.floor(Math.random() * listaAmigos.length);
  lista.innerHTML = `<li class="result-list">🎉 El amigo secreto es: ${listaAmigos[indice]}🎉</li>`;
  aviso.textContent = "Juego terminado. Se ha elegido al amigo secreto."
  btnSortear.disabled = true;
}

