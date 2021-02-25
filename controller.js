'use strict';
/*global Model, View */ /* a jshint hint */

let model, view;

const initialise = evt => {
    model = new Model();
    view = new View();
    //do any initialisation and "plumbing" here


    //update scotland new cases
    view.updateUserDefinedLocationNewCases(model.getUserDefinedLocationNewCases()[0].newCasesByPublishDate);

    view.updateUserDefinedLocationNewDeaths(model.getUserDefinedLocationNewDeaths()[0].newDeaths28DaysByPublishDate);

    view.updateNationalNewCases(model.getNationalNewCases()[0].newCasesByPublishDate) //we only want the last day of data not the week

    view.updateNationalNewDeaths(model.getNationalNewDeaths()[0].newDeaths28DaysByPublishDate)

    view.updateFirstDoseVaccinated(model.getFirstDoseVaccinated()[0].cumPeopleVaccinatedFirstDoseByPublishDate)


};

window.addEventListener("load", initialise);
