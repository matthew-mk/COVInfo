'use strict';
/*global Model, View */ /* a jshint hint */

let model, view;

const initialise = evt => {
    model = new Model();
    view = new View();
    //do any initialisation and "plumbing" here
};

window.addEventListener("load", initialise);
