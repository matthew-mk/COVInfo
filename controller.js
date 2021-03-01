'use strict';
/*global Model, View */ /* a jshint hint */

let model, view;

const initialise = evt => {
    model = new Model();
    view = new View();
    //do any initialisation and "plumbing" here

    const displayStats = function () {
        view.updateUserDefinedLocationNewCases(model.formatNumber(localStorage.getItem("userDefinedLocationNewCases")));
        view.updateUserDefinedLocationNewDeaths(model.formatNumber(localStorage.getItem("userDefinedLocationNewDeaths")));
        view.updateNationalNewCases(model.formatNumber(localStorage.getItem("nationalNewCases"))); //we only want the last day of data not the week
        view.updateNationalNewDeaths(model.formatNumber(localStorage.getItem("nationalNewDeaths")));
        view.updateFirstDoseVaccinated(model.formatNumber(localStorage.getItem("firstDoseVaccinated")));
    };



    // update stats daily and display the stats
    if (localStorage.getItem("statsLastUpdated") !== model.getDate()) {
        model.storeUpdatedStats();
        displayStats();
    } else {
        displayStats();
    }

    //display the date when stats were updated under each statistic
    model.displayDates(view.statsDates);

};

window.addEventListener("load", initialise);
