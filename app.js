// 1. Selección de elementos del DOM

//Vista previa donde se van agregando los elementos
const vistaPrevia = document.getElementById("vista-previa");

//--H1--
const inputH1 = document.getElementById("input-h1");
const btnH1 = document.getElementById("btn-h1");

//--H2--
const inputH2 = document.getElementById("input-h2");
const btnH2 = document.getElementById("btn-h2");

//--Parrafo--
const inputP = document.getElementById("input-p");
const btnP = document.getElementById("btn-p");


//2. FUNCIÓN AUXILIAR PARA OBTENER ALINEACIÓN

function obtenerAlineacion(nombreRadio){
    const radios = document.querySelectorAll(`input[name="${nombreRadio}"]`);
    for(const radio of radios){
	if(radio.checked){
	    return radio.value;
	}
    }
    return left;
}


//3. LÓGICA PARA EL ENCABEZDO PRINCIPAL (H1)

btnH1.addEventListener("click", function(){
    const texto = inputH1.value.trim();

    //Si el campo está vacio no hacemos nada
    if(texto==="") return;

    //Creamos dinamicamente la etiqueta <h1>
    const nuevoH1 = document.createElement("h1");
    nuevoH1.textContent = texto;

    //Obtenemos la alineación elegida (left, right, center) y la aplicamos
    const alineacion = obtenerAlineacion("align-h1");
    nuevoH1.style.textAlign = alineacion;

    //Inyectamos el elemento creado dentro del contenedor de vista previa
    vistaPrevia.appendChild(nuevoH1);
    registrarAccionEnHistorial(nuevoH1); // <-- ¡Con esto se registra automáticamente!

    //Limpiamos el campo de texto después d eingresarlo
    inputH1.value="";
});


//4. LÓGICA PARA EL ENCABEZADO SECUNDARIO (H2)

btnH2.addEventListener("click", function(){
    const texto = inputH2.value.trim();

    //Si el campo esta vacio no hacemos nada
    if(texto==="") return;

    //Creamos dinámicamente la etiqueta <h2>
    const nuevoH2 = document.createElement("h2");
    nuevoH2.textContent = texto;

    //Obtenemos la alineación elegida (left, center, right) y la aplicamos
    const alineacion = obtenerAlineacion("align-h2");
    nuevoH2.style.textAlign = alineacion;

    //Inyectamos el elemento creado dentro del contenedor de vista previa
    vistaPrevia.appendChild(nuevoH2);
    registrarAccionEnHistorial(nuevoH2); // <-- ¡Con esto se registra automáticamente!

    //Limpiamos el campo de texto despúes de haberlo ingresado
    inputH2.value="";
});


//5. LÓGICA PARA LA IMAGEN

const inputIMG = document.getElementById("input-img");
const btnIMG = document.getElementById("btn-img");

let archivoSeleccionadoUrl = "";

//Prevenir el comportamiento por defecto para permitir el arrastre
inputIMG.addEventListener("dragover",function(e){
    e.preventDefault();
});

//Capturar el archivo cuando se suelta dentro del input
inputIMG.addEventListener("drop",function(e){
    e.preventDefault();
    const archivo = e.dataTransfer.files[0];
    if(archivo && archivo.type.startsWith("image/")){
	//Creamos una URL local temporal en memoria para el archivo
	archivoSeleccionadoUrl = URL.createObjectURL(archivo);
	inputIMG.value = archivo.name; //mostramos el nombre del archivo en el input
    }
});


btnIMG.addEventListener("click",function(){
    //Usamos la URL del archivo arrastrado o el texto ingresado manualmente
    const urlFinal = archivoSeleccionadoUrl || inputIMG.value.trim();

    //Si el campo esta vacio no hacemos nada
    if(urlFinal==="") return;

    //Creamos un contenedor div para controlar la alineación del bloque de imagen
    const contenedorIMG=document.createElement("div");
    
    //Creamos dinámicamente la etiqueta <img>
    const nuevaIMG = document.createElement("img");
    nuevaIMG.src = urlFinal;
    nuevaIMG.alt= "imagen de vista previa";

    //Estilos básicos paa que la imagen no desborde el contenedor
    nuevaIMG.style.maxWidth="100%";
    nuevaIMG.style.height="auto";
    nuevaIMG.style.borderRadius="6px";

    //Obtenemos la alineación elegida y la aplicamos al contenedor
    const alineacion = obtenerAlineacion(`align-img`);
    contenedorIMG.style.textAlign = alineacion;

    //Agregamos la iamgen al contenedor y este a la vista previa
    contenedorIMG.appendChild(nuevaIMG);
    vistaPrevia.appendChild(contenedorIMG);
    registrarAccionEnHistorial(contenedorIMG); // <-- ¡Con esto se registra automáticamente!

    //Limpiamos el campo de texto tras ingresar la imagen
    inputIMG.value="";
    archivoSeleccionadoUrl="";
});


//6. LÓGICA PARA EL PARRAFO

btnP.addEventListener("click",function(){
    const texto = inputP.value.trim();

    //Si el campo está vacio no hacemos nada
    if(texto==="") return;

    //Creamos dinámicamente la etiqueta <p>
    const nuevoP = document.createElement("p");
    nuevoP.textContent = texto;

    //Obtenemos la alineación elegida (left,center,right) y la aplicamos
    const alineacion = obtenerAlineacion("align-p");
    nuevoP.style.textAlign = alineacion;

    //Inyectamos el elemento creado dentro del contenedor de vista previa
    vistaPrevia.appendChild(nuevoP);
    registrarAccionEnHistorial(nuevoP); // <-- ¡Con esto se registra automáticamente!

    //Limpiamos el campo de texto después de ingresarlo
    inputP.value="";
});


//7. LÓGICA PARA LAS LÍSTAS DINÁMICAS
const inputItemLista = document.getElementById("input-item-lista"); //Input para cada elemento
const btnAgregarItem = document.getElementById("btn-agregar-item"); //Boton para sumar a la lista temporal
const listaTemporalUl = document.getElementById("lista-temporal-ul");//(OPCIONAL)Una listita visual de items agregados
const btnGenerarLista = document.getElementById("btn-generar-lista");//Boton final para crear la lista en la vista previa de los ítems

//Array temporal para guardar los textos de los ítems
let itemsAcumulados = [];

//1.Agrear ítem al array temporal
btnAgregarItem.addEventListener("click",function(){
    const textoItem = inputItemLista.value.trim();

    //Si el texto está en limpio no hacemos nada
    if(textoItem==="") return;

    //Guardamos el texto en el arreglo
    itemsAcumulados.push(textoItem);

    //Opcional: mostrar visualmente en una lista chica de control lo que vas agregando
    const liTemporal = document.createElement("li");
    liTemporal.textContent = textoItem;
    listaTemporalUl.appendChild(liTemporal);

    //Limpiamos el input del item para escribir el siguiente
    inputItemLista.value = "";
    
});

//2. Generar la lista final en la vista previa
btnGenerarLista.addEventListener("click", function(){
    console.log("Elementos en el arreglo:", itemsAcumulados); // <-- Añade esto
    //Si no hay items guardados no hacemos nada
    if(itemsAcumulados.length===0)return;

    //Determinar si el usuario eligió ordenada("ol") o desordenada("ul") con la misma función que obtiene la alineación
    const tipoLista = obtenerAlineacion("tipo-lista");  // "ul" u "ol"
    const nuevaLista = document.createElement(tipoLista);

    //Recorremos cada texto acumulado para crear sus etiquetas <li> e inyectarlas
    itemsAcumulados.forEach(function(textoItem){
	const nuevoLi = document.createElement("li");
	nuevoLi.textContent = textoItem;
	nuevaLista.appendChild(nuevoLi);
    });

    //Alineación de la lista
    const alineacion = obtenerAlineacion("align-lista");
    nuevaLista.style.textAlign = alineacion;
    nuevaLista.style.listStylePosition = "inside"; //Esto mete la viñeta junto al texto

    //Inyectamos la lista completa a la vista previa
    vistaPrevia.appendChild(nuevaLista);
    registrarAccionEnHistorial(nuevaLista);

    //Limpiamos todo para reiniciar el proceso de listas
    itemsAcumulados = [];
    listaTemporalUl.innerHTML = ""; //Borramos la lista visual temporal de control
    
});


//8. LÓGICA PARA EXPORTAR/DESCARGAR EL ARCHIVO HTML

const btnDescargar = document.getElementById("btn-descargar");

btnDescargar.addEventListener("click", function(){
    //1. Extraemos todo el HTML generado dentro de la vista previa
    const contenedorTemporal = document.createElement("div");
    contenedorTemporal.innerHTML = vistaPrevia.innerHTML

    //Si la vista previa esta vacia, no tiene sentido descargarla
    if(contenedorTemporal.innerHTML.trim()===""){
	alert("¡Aún no hay contenido en la vista previa para exportar!");
	return;
    }

    //Buscamos todas las imágenes dentro del contenido a exportar
    const imagenes = contenedorTemporal.querySelectorAll("img");

    //Si hay imagenes con src tipo "blob", se los remplazamos por la ruta genérica
    imagenes.forEach(img => {
	const srcActual = img.getAttribute("src");
	if(srcActual && srcActual.startsWith("blob")){
	    img.setAttribute("src","img/foto.jpg");
	}
    });
    
    // Armamos una estructura HTML profesional completa que envolverá el contenido
    const plantillaHTMLCompleta = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Página Generada</title>
    <style>
        /* Estilos base opcionales para que luzca ordenado al descargarlo */
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            line-height: 1.6;
            color: #333;
        }
        img {
            max-width: 100%;
            height: auto;
        }
    </style>
</head>
<body>
    ${contenedorTemporal.innerHTML}
</body>
</html>`;

    //3. Creamos un Blob (un archivo virtual en la memoria del navegador) con el texto HTML
    const blob = new Blob([plantillaHTMLCompleta], {type: "text/html;charset=utf-8"});
    //4. Generamos una URL temporal que apunta a ese Blob
    const urlTemporal = URL.createObjectURL(blob);

    //5. Creamos un elemento <a> "fantasma" en javascript para simular el clic de descarga
    const enlaceDescarga = document.createElement("a");
    enlaceDescarga.href = urlTemporal;
    enlaceDescarga.download = "mi-pagina-generada.html";//Nombre con el que se guardará el archivo

    //Lo agregamos temporalmente al documento, hacemos clic y lo removemos
    document.body.appendChild(enlaceDescarga);
    enlaceDescarga.click();
    document.body.removeChild(enlaceDescarga);

    //Liberamos la URL temporal de la memoria
    URL.revokeObjectURL(urlTemporal);
});


//9.LÓGICA DE UNDO Y REDO (HISTORIAL)
const undoStack = [];
const redoStack = [];

const btnUndo = document.getElementById("btn-undo");
const btnRedo = document.getElementById("btn-redo");

//Función auxiliar para registrarr nuevos elementos creados
function registrarAccionEnHistorial(elemento){
    undoStack.push(elemento);
    redoStack.length = 0; //Al hacer una nueva acción limpiamos el stack de redo
}

//Lógica del boton "Undo" (deshacer)
btnUndo.addEventListener("click", function(){
    if(undoStack.length===0){
	return; //No hay acciones que deshacer
    }

    //Sacamos el último elemento de la pila de Undo
    const elementoRemovido = undoStack.pop();

    //Lo guardamos en la pila de redo por si el ususario quiere rehacerlo
    redoStack.push(elementoRemovido);

    //Lo removemos visualmente d ela vista previa
    if(elementoRemovido.parentNode===vistaPrevia){
	vistaPrevia.removeChild(elementoRemovido);
    }
});

//Lógica del boton "Redo" (Rehacer)
btnRedo.addEventListener("click", function(){
    if(redoStack.length===0){
	return; //No hay acciones que rehacer
    }

    //Sacamos el último elemento de la pila de redo
    const elementoRestaurado = redoStack.pop();

    //Lo regresamos a la pila de undo
    undoStack.push(elementoRestaurado);

    //Lo volvemos a mostrar en la vista previa
    vistaPrevia.appendChild(elementoRestaurado);
});
