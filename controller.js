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
        view.updateUserDefinedLocationAlertLevel(model.formatNumber(localStorage.getItem("userDefinedLocationAlertLevel")));
    };

    const displayNationwideStats = function () {
        // ATTEMPT AT WAITING FOR THE MODEL TO FINISH BEFORE VIEW IS UPDATED AND PASSED A NULL VALUE
        let promise = new Promise((resolve, reject) => {
            resolve(model.statUpdate());
        });
        promise.then(()=>{
            view.updateNationalNewCases(model.formatNumber(localStorage.getItem("nationalNewCases"))); //we only want the last day of data not the week
            view.updateNationalNewDeaths(model.formatNumber(localStorage.getItem("nationalNewDeaths")));
            view.updateFirstDoseVaccinated(model.formatNumber(localStorage.getItem("firstDoseVaccinated")));
            view.updateNationalTotalCases(model.formatNumber(localStorage.getItem("nationalTotalCases")));
        });
    };

    const displayWorldwideStats = function () {
        //replace placeholder numbers with real numbers
        view.updateGlobalNewCases(model.formatNumber(localStorage.getItem("globalNewCases")));
        view.updateGlobalNewDeaths(model.formatNumber(localStorage.getItem("globalNewDeaths")));
        view.updateGlobalTotalDeaths(model.formatNumber(localStorage.getItem("globalTotalDeaths")));
        view.updateGlobalTotalCases(model.formatNumber(localStorage.getItem("globalTotalCases")));
    };

    const displayAllStats = function () {
        displayWorldwideStats();    // update global first since that tab needs overridden by national until global button is pressed
        displayLocalStats();
        displayNationwideStats();
    };

    const initStats = function () {
        //update stats daily and display the stats
        if (localStorage.getItem("statsLastUpdated") !== model.getDate()) {
            model.statUpdate();
            displayAllStats();
        } else {
            displayAllStats();
        }
        const statsDates = document.querySelectorAll(".box-date");
        model.displayDates(statsDates);  //display the date when stats were updated under each statistic
    };


    //INITIALISATION
    initStats();


    //EVENT LISTENERS
    //Stats Page
    if (document.URL.includes("statistics.html")) {
        const nationwideStatsButton = document.getElementById("nationwideStatsBtn");
        const worldwideStatsButton = document.getElementById("worldwideStatsBtn");

        nationwideStatsButton.addEventListener("click", () => {
            model.toggleNationwide(nationwideStatsButton, worldwideStatsButton);
            displayNationwideStats();
        });

        worldwideStatsButton.addEventListener("click", () => {
            model.toggleWorldwide(nationwideStatsButton, worldwideStatsButton);
            displayWorldwideStats();
        });
    }

    //News Page
    if (document.URL.includes("news.html")) {
        const nationwideNewsButton = document.getElementById("nationwideNewsBtn");
        const worldwideNewsButton = document.getElementById("worldwideNewsBtn");
        const nationwideNewsDiv = document.getElementById("nationwide-news");
        const worldwideNewsDiv = document.getElementById("worldwide-news");

        nationwideNewsButton.addEventListener("click", () => {
            model.toggleNationwide(nationwideNewsButton, worldwideNewsButton);
            model.hideDiv(worldwideNewsDiv);
            model.showDiv(nationwideNewsDiv);
        });

        worldwideNewsButton.addEventListener("click", () => {
            model.toggleWorldwide(nationwideNewsButton, worldwideNewsButton);
            model.hideDiv(nationwideNewsDiv);
            model.showDiv(worldwideNewsDiv);
        });
    }

    //Settings Page
    if (document.URL.includes("settings.html")) {
        const localStatsSettingText = document.getElementById("localstats-setting-text");
        const localStatsSettingBtn = document.getElementById("localstats-setting-btn");
        const dailySymptomsCheckSettingText = document.getElementById("dailysymptomscheck-settings-text");
        const dailySymptomsCheckSettingBtn = document.getElementById("dailysymptomscheck-settings-btn");
        const symptomsCheckSettingText = document.getElementById("symptomscheck-settings-text");
        const symptomsCheckSettingBtn = document.getElementById("symptomscheck-settings-btn");
        const basicInfoSettingText = document.getElementById("basicinfo-settings-text");
        const basicInfoSettingBtn = document.getElementById("basicinfo-settings-btn");
        const precautionInfoSettingText = document.getElementById("precautioninfo-settings-text");
        const precautionInfoSettingBtn = document.getElementById("precautioninfo-settings-btn");
        const themeBtn = document.getElementById("theme-btn");
        const themeText = document.getElementById("theme-Text");

        localStatsSettingBtn.addEventListener("click", () => {
            model.toggleSettingEnabledOrDisabled(localStatsSettingText, localStatsSettingBtn);
            model.saveSettingCheckbox("localBox",localStatsSettingBtn);
            model.saveSettingText("localText",localStatsSettingText);
        });

        dailySymptomsCheckSettingBtn.addEventListener("click", () => {
            model.toggleSettingEnabledOrDisabled(dailySymptomsCheckSettingText, dailySymptomsCheckSettingBtn);
            model.saveSettingCheckbox("dailySymptomsBox",dailySymptomsCheckSettingBtn);
            model.saveSettingText("dailySymptomsText",dailySymptomsCheckSettingText);
        });

        symptomsCheckSettingBtn.addEventListener("click", () => {
           model.toggleSettingEnabledOrDisabled(symptomsCheckSettingText, symptomsCheckSettingBtn);
            model.saveSettingCheckbox("symptomsCheckBox",symptomsCheckSettingBtn);
            model.saveSettingText("symptomsCheckText",symptomsCheckSettingText);
        });

        basicInfoSettingBtn.addEventListener("click", () => {
            model.toggleSettingEnabledOrDisabled(basicInfoSettingText, basicInfoSettingBtn);
            model.saveSettingCheckbox("basicBox",basicInfoSettingBtn);
            model.saveSettingText("basicText",basicInfoSettingText);
        });

        precautionInfoSettingBtn.addEventListener("click", () => {
            model.toggleSettingEnabledOrDisabled(precautionInfoSettingText, precautionInfoSettingBtn);
            model.saveSettingCheckbox("precautionBox",precautionInfoSettingBtn);
            model.saveSettingText("precautionText",precautionInfoSettingText);
        });

        themeBtn.addEventListener("click",() =>{
            model.toggleTheme(themeText, themeBtn);
        });
    }
};

window.addEventListener("load", initialise);
