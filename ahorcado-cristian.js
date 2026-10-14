
const PALABRA = document.getElementById('palabra');
const TECLADO = document.getElementById('teclado');
const ERROR = document.getElementById('error');
const DIALOG = document.getElementById('dialog');
const DIALOG_TITULO = document.getElementById('dialog-titulo');
const DIALOG_MENSAJE = document.getElementById('dialog-mensaje');

const partesCuerpo = [
  "#pierna-izq", // Fallo 1
  "#pierna-der", // Fallo 2
  "#tronco",     // Fallo 3
  "#brazo-izq",  // Fallo 4
  "#brazo-der",  // Fallo 5
  "#cabeza"      // Fallo 6
];

let palabraRandom = "";
let palabraAdivinada = [];

let intentos = 6;
let error = 0;

const PALABRAS = [
  'elefante',
  'montana',
  'computadora',
  'avion',
  'guitarra',
  'mariposa',
  'biblioteca',
  'universo',
  'volcan',
  'pirata',
  'dragon',
  'robot',
  'planeta',
  'castillo',
  'espejo',
  'telefono',
  'bicicleta',
  'fantasma',
  'bosque',
  'cohete',
  'tornado',
  'sandia',
  'canguro',
  'murcielago',
  'aventura'
];


function pintarErrores() {

  const parte =
    document.querySelector(
      partesCuerpo[error - 1]
    );

  if (parte) {
    parte.style.display = "block";
  }

  ERROR.innerHTML =
    error + "/" + intentos;
}


function pintarPalabra() {

  PALABRA.innerHTML =
    palabraAdivinada.join(' ');
}


function empezar() {

  palabraRandom =
    PALABRAS[
      Math.floor(
        Math.random() * PALABRAS.length
      )
    ].toUpperCase();

  palabraAdivinada =
    Array(palabraRandom.length).fill('_');

  error = 0;

  console.log(
    'Palabra Random:',
    palabraRandom
  );

  // Ocultar todas las partes del cuerpo
  document
    .querySelectorAll(".parte-cuerpo")
    .forEach(parte => {
      parte.style.display = "none";
    });

  pintarErrores();
  pintarPalabra();
  teclado();
}


function teclado() {

  TECLADO.innerHTML = '';

  const abc =
    "QWERTYUIOPASDFGHJKLÑZXCVBNM";

  for (let letra of abc) {

    const button =
      document.createElement("button");

    button.id = letra;

    button.innerHTML = letra;

    button.className =
      "rounded-lg bg-gray-200 px-4 py-2 font-bold text-gray-800 transition hover:bg-gray-300";

    button.addEventListener(
      "click",
      () => pulsar(letra)
    );

    TECLADO.appendChild(button);
  }
}


function pulsar(valor) {

  // Si no hay partida iniciada
  if (palabraRandom === "") {
    return;
  }

  // Buscar el botón pulsado
  const button =
    document.getElementById(valor);

  // Desactivar el botón
  if (button) {

    button.disabled = true;

    button.classList.add(
      "cursor-not-allowed",
      "opacity-50"
    );
  }

  let acierto = false;

  // Comprobar la letra
  for (
    let i = 0;
    i < palabraRandom.length;
    i++
  ) {

    if (palabraRandom[i] === valor) {

      palabraAdivinada[i] = valor;

      acierto = true;
    }
  }

  // Si la letra es correcta
  if (acierto) {

    pintarPalabra();

    // Comprobar si ha ganado
    if (
      !palabraAdivinada.includes("_")
    ) {

      setTimeout(() => {

        mostrarDialog(
          "¡Has ganado! 🎉",
          "La palabra era " + palabraRandom
        );

      }, 100);
    }
  }

  // Si la letra es incorrecta
  else {

    error++;

    pintarErrores();

    // Comprobar si ha perdido
    if (error >= intentos) {

      setTimeout(() => {

        mostrarDialog(
          "¡Has perdido! 💀",
          "La palabra era " + palabraRandom
        );

        palabraAdivinada =
          palabraRandom.split("");

        pintarPalabra();

      }, 100);
    }
  }
}


// Mostrar el dialog
function mostrarDialog(titulo, mensaje) {

  DIALOG_TITULO.innerHTML = titulo;
  DIALOG_MENSAJE.innerHTML = mensaje;

  DIALOG.showModal();
}


// Cerrar el dialog
function cerrarDialog() {

  DIALOG.close();
}

