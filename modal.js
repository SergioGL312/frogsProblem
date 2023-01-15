const msgLose = "<span class=\"red\">Mala suerte</span>";
const msgWin = "<span class=\"green\">¡Enhorabuena!</span>";

export function displayModal(verificar, clicks) {
    if (verificar == false) {
        document.querySelector(".resultado").innerHTML = msgLose;
        document.querySelector(".mensaje").innerHTML = "Las ranas se han atascado. ¡Inténtalo de nuevo!";
    } else {
        document.querySelector(".resultado").innerHTML = msgWin;
        document.querySelector(".mensaje").innerHTML = `Has resuelto el puzzle con ${clicks} intentos`;
    }
    
    let modal = document.querySelector(".modal-background");
    modal.style.display = "flex";
    modal.style.animation = "aparecer 1s forwards";

    const mdlBackground = document.querySelector(".modal-background");

    mdlBackground.addEventListener("click", () => {
        mdlBackground.style.display = "none";
    });
}