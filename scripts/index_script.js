console.log('works!');

$(document).ready(onReady);

function onReady() {
    addNav(indexPathPrefix, navPathPrefix);

    addFooter(imagePathPrefix);
}

let indexPathPrefix = '';
let navPathPrefix = 'views/';

let imagePathPrefix = '';

let qr_div = new QRCode(document.getElementById("qr_div"), "content of QR Code");
