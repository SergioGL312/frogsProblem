export function croak() {
    var frog_croak = new Audio();
    frog_croak.src = "./audios/jumping-sound.mp3";
    frog_croak.play();
}

export function win() {
    var win = new Audio();
    win.src = "./audios/win.mp3";
    win.play();
}

export function lose() {
    var lose = new Audio();
    lose.src = "./audios/lose.mp3";
    lose.play();
}