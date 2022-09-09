const words = ['Carne', 'Martillo', 'Lavadora', 'Sucio', 'Cangrejo', 'Lento', 'Alimentos', 'Delgado', 'Cubo', 'Comida', 'Caracol', 'Abajo', 'Alumno', 'Bonito', 'Cesta', 'Sol', 'Beber', 'Botella', 'Hamburguesa', 'Invierno'];

let text = document.getElementById('texto');
let advertencia = document.getElementById('advertencia');
let textoUsado = document.getElementById('textoUsado');
let mensaje = document.getElementById('mensaje');
let campos = document.getElementById('campos');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var nueva = getParameterByName('nuevaPalabra');
let palabra = [];
let letrasUsadas = [];
let hits = 0;
let errores = 0;


const bodyParts = [
    [1, 0, 0.5, 8],
    [1.5, 0, 6.5, 0.5],
    [7.5, 0, 0.5, 2],
    [0, 0, 0, 0],
    [7.5, 2.8, 0.5, 2.5],
    [7.7, 5.2, 6, 6.3],
    [7.7, 5.2, 9.4, 6.3],
    [7.5, 3.2, 6, 4],
    [7.5, 3.2, 9.2, 4]
]

function startGame() {
    ctx.canvas.width = 0;
    ctx.canvas.height = 0;
    text.innerHTML = '';
    advertencia.innerHTML = '';
    textoUsado.innerHTML = '';
    mensaje.innerHTML = '';
    campos.innerHTML = '';
    canvas.innerHTML = '';
    palabra = [];
    letrasUsadas = [];
    hits = 0;
    errores = 0;
    dibujarOrca();
    selectPalabra();
    dibujarPalabra();
    agregarPalabra();
    document.addEventListener('keydown', letterEvent);
    console.log(words)
}

function letterEvent(event) {
    advertencia.innerHTML = '';
    let newLetter = event.key.toUpperCase();
    if (newLetter.match(/^[a-zñ]$/i)) {
        if (!letrasUsadas.includes(newLetter)) {
            letterInput(newLetter);
        } else {
            advertencia.innerHTML = 'La letra ya ha sido utilizada';
        }

    }
}
function letterInput(letra) {
    if (palabra.includes(letra)) {
        const { children } = text;
        for (let index = 0; index < children.length; index++) {
            if (children[index].innerHTML === letra) {
                children[index].classList.toggle('hidden');
                hits++;
            }
        }
        if (hits === palabra.length) {
            mensaje.innerHTML = 'FELICIDADES GANASTE'
            document.removeEventListener('keydown', letterEvent);
        }
    } else {

        if (errores === 3) {
            ctx.strokeStyle = '#0A3871';
            ctx.arc(7.75, 2.5, 0.3, 0, 2 * Math.PI);
            ctx.stroke();
            errores++;
        } else if (errores > 4) {
            ctx.strokeStyle = '#0A3871';
            ctx.moveTo(bodyParts[errores][0], bodyParts[errores][1]);
            ctx.lineTo(bodyParts[errores][2], bodyParts[errores][3]);
            ctx.stroke();
            errores++;
        } else {
            ctx.fillStyle = '#0A3871';
            ctx.fillRect(...bodyParts[errores]);
            errores++;
        }
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letra.toUpperCase();
        letterElement.classList.add('usado');
        textoUsado.appendChild(letterElement);
        if (errores === bodyParts.length) {
            mensaje.innerHTML = 'JUEGO TERMINADO'
            document.removeEventListener('keydown', letterEvent);
        }
    }
    letrasUsadas.push(letra);
}
function selectPalabra() {
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    palabra = word.split('');
}
function dibujarOrca() {
    ctx.canvas.width = 225;
    ctx.canvas.height = 150;
    ctx.scale(20, 20);
    ctx.fillStyle = '#0A3871';
    ctx.fillRect(0, 7, canvas.width, canvas.height);
}

function dibujarPalabra() {
    palabra.forEach(letter => {
        const letterElement = document.createElement('span');
        letterElement.innerHTML = letter.toUpperCase();
        letterElement.classList.add('letter');
        letterElement.classList.add('hidden');
        text.appendChild(letterElement);
        const camp = document.createElement('span');
        camp.innerHTML = ' _ ';
        camp.classList.add('camp');
        campos.appendChild(camp);
    });
}

function enviarPalabra() {
    var nuevaPalabra = document.getElementById('nueva').value;
    location.assign('../HTML/Game.html?nuevaPalabra=' + nuevaPalabra)
}

function agregarPalabra() {
    if (nueva != '') {
        words.push(nueva.toUpperCase());
    }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}