'use strict';
/*global Model, View */ /* a jshint hint */

let model, view;

const initialise = evt => {
    model = new Model();
    view = new View();

    //FUNCTIONS
    const displayLocalStats = function () {
        view.updateUserDefinedLocationNewCases(model.formatNumber(localStorage.getItem("userDefinedLocationNewCases")));
        view.updateUserDefinedLocationNewDeaths(model.formatNumber(localStorage.getItem("userDefinedLocationNewDeaths")));
    };

    const displayNationwideStats = function () {
        view.updateNationalNewCases(model.formatNumber(localStorage.getItem("nationalNewCases"))); //we only want the last day of data not the week
        view.updateNationalNewDeaths(model.formatNumber(localStorage.getItem("nationalNewDeaths")));
        view.updateFirstDoseVaccinated(model.formatNumber(localStorage.getItem("firstDoseVaccinated")));
    };

    const displayWorldwideStats = function () {
        //replace placeholder numbers with real numbers
        view.updateNationalNewCases("100,000");
        view.updateNationalNewDeaths("200,000");
        view.updateFirstDoseVaccinated("50,000,000");
    };


    //INITIALISATION
    //update stats daily and display the stats
    if (localStorage.getItem("statsLastUpdated") !== model.getDate()) {
        model.storeUpdatedStats();
        displayLocalStats();
        displayNationwideStats();
    } else {
        displayLocalStats();
        displayNationwideStats();
    }
    model.displayDates(view.statsDates);  //display the date when stats were updated under each statistic


    //EVENT LISTENERS
    //Stats Page
    if (document.URL.includes("statistics.html")) {
        view.nationwideStatsButton.addEventListener("click", () => {
            model.toggleNationwide(view.nationwideStatsButton, view.worldwideStatsButton);
            displayNationwideStats();
        });

        view.worldwideStatsButton.addEventListener("click", () => {
            model.toggleWorldwide(view.nationwideStatsButton, view.worldwideStatsButton);
            displayWorldwideStats();
        });
    }

    //News Page
    if (document.URL.includes("news.html")) {
        view.nationwideNewsButton.addEventListener("click", () => {
            model.toggleNationwide(view.nationwideNewsButton, view.worldwideNewsButton);
            model.hideDiv(view.worldwideNewsDiv);
            model.showDiv(view.nationwideNewsDiv);
        });

        view.worldwideNewsButton.addEventListener("click", () => {
            model.toggleWorldwide(view.nationwideNewsButton, view.worldwideNewsButton);
            model.hideDiv(view.nationwideNewsDiv);
            model.showDiv(view.worldwideNewsDiv);
        });
    }

    //Settings Page
    if (document.URL.includes("settings.html")) {
        view.localStatsSettingBtn.addEventListener("click", () => {
            model.toggleSettingEnabledOrDisabled(view.localStatsSettingText, view.localStatsSettingBtn);
            model.saveSettingCheckbox("localBox",view.localStatsSettingBtn);
            model.saveSettingText("localText",view.localStatsSettingText);
        });

        view.dailySymptomsCheckSettingBtn.addEventListener("click", () => {
            model.toggleSettingEnabledOrDisabled(view.dailySymptomsCheckSettingText, view.dailySymptomsCheckSettingBtn);
            model.saveSettingCheckbox("dailySymptomsBox",view.dailySymptomsCheckSettingBtn);
            model.saveSettingText("dailySymptomsText",view.dailySymptomsCheckSettingText);
        });

        view.symptomsCheckSettingBtn.addEventListener("click", () => {
           model.toggleSettingEnabledOrDisabled(view.symptomsCheckSettingText, view.symptomsCheckSettingBtn);
            model.saveSettingCheckbox("symptomsCheckBox",view.symptomsCheckSettingBtn);
            model.saveSettingText("symptomsCheckText",view.symptomsCheckSettingText);
        });

        view.basicInfoSettingBtn.addEventListener("click", () => {
            model.toggleSettingEnabledOrDisabled(view.basicInfoSettingText, view.basicInfoSettingBtn);
            model.saveSettingCheckbox("basicBox",view.basicInfoSettingBtn);
            model.saveSettingText("basicText",view.basicInfoSettingText);
        });

        view.precautionInfoSettingBtn.addEventListener("click", () => {
            model.toggleSettingEnabledOrDisabled(view.precautionInfoSettingText, view.precautionInfoSettingBtn);
            model.saveSettingCheckbox("precautionBox",view.precautionInfoSettingBtn);
            model.saveSettingText("precautionText",view.precautionInfoSettingText);
        });

        view.themeBtn.addEventListener("click",() =>{
            model.toggleTheme(view.themeText, view.themeBtn);
        });
    }
};

window.addEventListener("load", initialise);
