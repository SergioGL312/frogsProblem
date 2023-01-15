import { Q, Σ, δ, q0, F } from './5-tupla.js';
import { croak, win, lose } from './sonidos.js';
import { displayModal } from './modal.js';

let estadoLeido = q0;
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

                    if(estadoActual == 72 || δ[i][j + 1] == 72) {
                        displayModal(false, clicks);
                        lose();
                    }

                    if(!(estadoActual == δ[i][j + 1])){
                        swapDivs();
                        estadoLeido = δ[i][j + 1];
                    }
                    
                    if (esAceptada(δ[i][j + 1], cadena.substring(1))) {
                        displayModal(true, clicks);
                        win();
                        return true;
                    }
                }
            }
        }
    }
    return false;
}


function swapElements(obj1, obj2) {
    var parent2 = obj2.parentNode;
    var next2 = obj2.nextSibling;
    if (next2 === obj1) {
        parent2.insertBefore(obj1, obj2);
    } else {
        obj1.parentNode.insertBefore(obj2, obj1);
        if (next2) {
            parent2.insertBefore(obj1, next2);
        } else {
            parent2.appendChild(obj1);
        }
    }
}

function swapDivs() {
    croak();
    swapElements(document.getElementById(divId), document.getElementById('_'));
}

var divId;

function puedeSaltar() {
    // croak(); Todas las ranas sonarian
    clicks += 1;
    divId = this.id;
    esAceptada(estadoLeido, divId);
}

const divs = [... document.querySelectorAll('#content div')];

divs.forEach(function(div){
    div.addEventListener('click', puedeSaltar, false);
});
