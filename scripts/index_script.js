console.log('works!');

$(document).ready(onReady);

function onReady() {
    addNav(indexPathPrefix, navPathPrefix);

    addFooter(imagePathPrefix);
}

let indexPathPrefix = '';
let navPathPrefix = 'views/';

let imagePathPrefix = '';
