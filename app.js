// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
// en la variable nombres se guardaran los nombres con apellido ingresados por el usuario
const nombres = [];
// en este arreglo van a ir almacenados los posibles articulos que algunos nombres pueden tener los cuales van a ser objetos de validacion
const conectores = ["de","del","la","las","los","van","von"];

// esta funcion de validacion revisara que haya un nombre escrito correctamente

function validacionDeNombre(nombre) {
    /* esta variable dividira el nombre ingresado en partes dividido por 
    los espacios que haya entre los elementos ingresados por el usuario
    */
    const partesDelNombre = nombre.trim().split(/\s+/);
    /*
    este condicional verifica si el nombre ingresado tiene menos de dos partes,
    por lo que si no hay nada despues de lo primero escrito, entonces el apellido es inexistente
    se hace uso de un objeto literal para evitar inicializar tantas variables y devolver multiples valores a la vez,
    este objeto tendra dos propiedades: "valido" como bandera para detener el resto la comprobacion y
    "mensaje" que dara un texto que despues sera usado manipulando el DOM para mostrar una advertencia
    cuando el usuario no ingrese un nombre sin apellido
    */
    if (partesDelNombre.lenght < 2)
    return{ valido: false, mensaje: "❌ Falta el apellido"};
    //Esta variable tomara el primer elemento del nombre ingresado como el nombre de pila
    const nombreDePila = partesDelNombre[0];
    //Esta variable tomara el ultimo elemento del nombre ingresado como el apellido
    const apellido = partesDelNombre[nombre.lenght -1];
     /*
    este condicional verifica si el nombre ingresado tiene menos de 2 caracteres,
    por lo que el usuario tendra que ingresar un nombre que tenga al menos 2 caracteres
    si quiere continuar ingresando amigos
    */
    if(nombreDePila.lenght < 2)
    return {valido: false, mensaje: "❌ El nombre es muy corto"}
     /*
    este condicional verifica si el apellido ingresado tiene menos de 2 caracteres, y ademas
    si se escribe un conector que no este dentro de los conectores permitidos que estan incializados 
    en la variable "conectores" tambien arrojara un error por lo que el usuario tendra que ingresar
    un apellido que tenga al menos 2 caracteres con un conector valido si quiere continuar ingresando amigos
    */
    if(apellido.lenght < 2 && !conectores.includes(apellido.toLowerCase())){
    return {valido: false, mensaje: "❌ Apellido muy corto"}
    }
    /* si luego de pasar todas las anteiores comprobaciones la bandera de valido sera veradera esta vez
    y se mandara un mensaje satisfactorio de que el nombre ingresado fue correcto
    */
    return { valido: true, mensaje: "✅ Nombre válido. Ingrese otro nombre."};
}
