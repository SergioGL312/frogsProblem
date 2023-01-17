import { Q, Σ, δ, q0, F } from './5-tupla.js';
import { croak, win, lose } from './sonidos.js';
import { displayModal } from './modal.js';

let ultimoEstado = q0;
let clicks = 0;

function esEstadoFinal(estado) {
    for (let i = 0; i < F.length; i++) {
        if (estado == F[i]) {
            return true;
        }
    }
    return false;
}

function esAceptada(estadoActual, cadena) {

    if (esEstadoFinal(estadoActual) && cadena.length == 0) {
        return true;
    }

    for (let i = 0; i < Q.length; i++) {
        if (estadoActual == Q[i]) {
            for (let j = 0; j < Σ.length; j++) {
                if (cadena[0] == Σ[j]) {

                    console.log(`${estadoActual}     ${cadena[0]}      ${δ[i][j + 1]}\n`);

                    if (!(estadoActual == δ[i][j + 1])) {
                        croak();
                        swapElements(document.getElementById(cadena), document.getElementById('_'));
                        ultimoEstado = δ[i][j + 1];
                    } else {
                        console.log("invalid");
                    }

                    if (δ[i][j + 1] == δ.length) {
                        displayModal(false, clicks);
                        lose();
                        console.log("loser");
                    }

                    if (esAceptada(δ[i][j + 1], cadena.substring(1))) {
                        displayModal(true, clicks);
                        win();
                        console.log("winner");
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function swapElements(obj1, obj2) {
    let parent2 = obj2.parentNode;
    let next2 = obj2.nextSibling;
    if (next2 === obj1) {
        parent2.insertBefore(obj1, obj2);
    } else {

        let anterior = obj1.previousElementSibling;
        let siguiente = obj1.nextElementSibling;

        let anteriorId = anterior ? anterior.id : '';
        let siguienteId = siguiente ? siguiente.id : '';

        console.log(anteriorId);
        console.log(siguienteId);

        if (siguienteId == '_' ) {
            console.log("salto simple verde");
            obj1.style.animation = "shortJumpV .8s linear";
        } else if (anteriorId == '_' ) {
            console.log("salto simple azul");
            obj1.style.animation = "shortJumpA .8s linear";
        } else if (obj1.className == 'v') {
            console.log("salto doble verde");
            obj1.style.animation = "largeJumpV .8s linear";
        } else {
            console.log("salto doble azul");
            obj1.style.animation = "largeJumpA .8s linear";
        }

        setTimeout(() => {
            obj1.style.animation = "none";
            obj1.parentNode.insertBefore(obj2, obj1);
            if (next2) {
                parent2.insertBefore(obj1, next2);
            } else {
                parent2.appendChild(obj1);
            }
        }, 760);


    }
}

function puedeSaltar() {
    clicks += 1;
    esAceptada(ultimoEstado, this.id);
}

const divs = [...document.querySelectorAll('#content div')];
console.log(divs);

divs.forEach(function (div) {
    div.addEventListener('click', puedeSaltar, false);
});


