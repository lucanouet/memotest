document.querySelector('#jugar').onclick = comenzarJuego
let pares = document.querySelector('#pares-obtenidos')

let jugada;
let ronda = []
let numeroRonda = 0
let controlarRepeticion = []
let paresObtenidos = 0

function comenzarJuego() {
    reiniciarRonda()
    numeroRonda = 0
    actualizarNumeroRonda(numeroRonda)
    jugada = obtenerJugadaAleatoria()
    desbloquearinputs()
}



function manejarInput(e) {

    $cuadroElegido = e.target
    idCuadroElegido = e.target.id
    controlarRepeticion.push(idCuadroElegido)
    const fichaOculta = jugada[idCuadroElegido].img
    const imagen = obtenerImagen(fichaOculta)
    mostrarImagen(imagen, idCuadroElegido)
    ronda.push(imagen)

    if (ronda.length == 2) {
        bloquearInput()


        if (ronda[0].src == ronda[1].src) {
            paresObtenidos++
            pares.textContent = paresObtenidos
            ronda.forEach(function($ronda) {
                setTimeout(function() {
                    $ronda.parentNode.style.backgroundImage = 'none'
                    $ronda.remove()


                }, 500)
                setTimeout(function() {
                    numeroRonda++
                    actualizarNumeroRonda(numeroRonda)
                    reiniciarRonda()
                    desbloquearinputs()
                }, 600)

            })

            if (paresObtenidos === 8) {
                pares.textContent = (paresObtenidos + '     GANASTEEE!!!!')

            }

            return
        }

        if (ronda[0].src != ronda[1].src) {
            setTimeout(function() {
                ocultarFichas()
                reiniciarRonda()
                numeroRonda++
                actualizarNumeroRonda(numeroRonda)
                desbloquearinputs()
            }, 1000)

        }


    }

}

function actualizarNumeroRonda(numero) {
    const $numeroRonda = document.querySelector('#numero-ronda')
    $numeroRonda.textContent = numero
}

function reiniciarRonda() {
    ocultarFichas()
    ronda = []
    idCuadroElegido = []
    controlarRepeticion = []
}

function ocultarFichas() {
    document.querySelectorAll('img').forEach(function($img) {

        $img.remove()
    })
}

function desbloquearinputs() {
    document.querySelectorAll('.ficha').forEach(function($div) {
        $div.onclick = manejarInput
    })
}

function bloquearInput() {
    document.querySelectorAll('.ficha').forEach(function($div) {

        $div.onclick = ''
    })
}


function mostrarImagen(imagen, posicion) {

    const $divsFicha = document.querySelectorAll('.ficha')

    $divsFicha[posicion].appendChild(imagen)

}

function obtenerImagen(destino) {

    const imagen = new Image()
    imagen.src = destino

    return imagen
}

function obtenerJugadaAleatoria() {

    fichas.sort(() => Math.random() - 0.5)

    return fichas
}
