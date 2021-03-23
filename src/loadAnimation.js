'use strict';
/*global $:false, document:false*/
$(document).ready(function() {
    $("header").fadeIn(300);
    $("main").fadeIn(300); 
    $("nav").fadeIn(300);
});

window.onbeforeunload = function() {
    $("header").fadeOut(50);
    $("main").fadeOut(50);  
    $("nav").fadeOut(50);
}