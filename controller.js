'use strict';
/*global Model, View */ /* a jshint hint */

let model, view;

const initialise = evt => {
    model = new Model();
    view = new View();

    //FUNCTIONS
    const displayLocalStats = function () {
        view.updateUserDefinedLocationNewCases(model.formatNumber(localStorage.getItem("userDefinedLocationNewCases")), model.formatNumber(localStorage.getItem("userDefinedLocationNewCasesYesterday")));
        view.updateUserDefinedLocationNewDeaths(model.formatNumber(localStorage.getItem("userDefinedLocationNewDeaths")), model.formatNumber(localStorage.getItem("userDefinedLocationNewDeathsYesterday")));
        view.updateUserDefinedLocationAlertLevel(model.formatNumber(localStorage.getItem("userDefinedLocationAlertLevel")));
        view.updateUserDefinedTotalCases(model.formatNumber(localStorage.getItem("userDefinedTotalCases")));
        view.updateUserDefinedTotalDeaths(model.formatNumber(localStorage.getItem("userDefinedTotalDeaths")));
    };

    const displayNationwideStats = function () {
            view.updateNationalNewCases(model.formatNumber(localStorage.getItem("nationalNewCases")), model.formatNumber(localStorage.getItem("nationalNewCasesYesterday"))); //we only want the last day of data not the week
            view.updateNationalNewDeaths(model.formatNumber(localStorage.getItem("nationalNewDeaths")), model.formatNumber(localStorage.getItem("nationalNewDeathsYesterday")));
            view.updateFirstDoseVaccinated(model.formatNumber(localStorage.getItem("firstDoseVaccinated")));
            view.updateNationalTotalCases(model.formatNumber(localStorage.getItem("nationalTotalCases")));
    };

    const displayWorldwideStats = function () {
        // temp trick until something better works to fix the first time loading page bug
        if(localStorage.getItem("globalNewCases") === null){
            setTimeout(function(){
                window.location.reload(1);
             }, 3000); 
        }
        view.updateGlobalNewCases(model.formatNumber(localStorage.getItem("globalNewCases")), model.formatNumber(localStorage.getItem("globalNewCasesYesterday")));
        view.updateGlobalNewDeaths(model.formatNumber(localStorage.getItem("globalNewDeaths")), model.formatNumber(localStorage.getItem("globalNewDeathsYesterday")));
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
    //Index page
    if (document.URL.includes("index.html")) {
        const symptomsButton = document.getElementById("symptoms-btn");

        let numberOfSymptoms = JSON.parse(localStorage.getItem("lastSymptomsCheckResults")).length;
        if (numberOfSymptoms > 0) {
            symptomsButton.textContent = `${numberOfSymptoms} symptoms`;
            symptomsButton.style.backgroundColor = "#f8c4c1";
            symptomsButton.style.color = "#e96b64";
        }
    }

    //Symptoms form page
    if (document.URL.includes("symptomsform.html")) {
        const symptomsFormDiv = document.getElementById("symptoms-form-container");
        const symptomsResultsDiv = document.getElementById("symptoms-results-container");
        const positiveResultsDiv = document.getElementById("display-positive-results");
        const negativeResultsDiv = document.getElementById("display-negative-results");
        const invalidInput = document.getElementById("invalid-input");
        const submitButton = document.querySelector(".submit-button");
        const clearButton = document.querySelector(".clear-button");
        const highTemperature = document.getElementById("highTemperature");
        const cough = document.getElementById("cough");
        const lossOfSmell = document.getElementById("lossOfSmell");
        const noneOfTheAbove = document.getElementById("noneOfTheAbove");
        const breathingYes = document.getElementById("breathingYes");
        const breathingNo = document.getElementById("breathingNo");

        const clearFormInput = function () {
            highTemperature.checked = false;
            cough.checked = false;
            lossOfSmell.checked = false;
            noneOfTheAbove.checked = false;
            breathingYes.checked = false;
            breathingNo.checked = false;
            invalidInput.textContent = "";
        };

        const isFormInputValid = function () {
            if ((highTemperature.checked || cough.checked || lossOfSmell.checked || noneOfTheAbove.checked) && (breathingYes.checked  || breathingNo.checked)) {
                return true;
            }
            return false;
        };

        const getSymptoms = function () {
            let symptoms = [];
            if (highTemperature.checked) {
                symptoms.push("High temperature (fever)");
            }
            if (cough.checked) {
                symptoms.push("A new, continuous cough");
            }
            if (lossOfSmell.checked) {
                symptoms.push("A loss of smell, or a loss of taste");
            }
            if (breathingYes.checked) {
                symptoms.push("Struggling to breath");
            }
            return symptoms;
        };

        const isFormInputPositive = function () {
            if (getSymptoms().length > 0) {
                return false;
            }
            return true;
        };

        submitButton.addEventListener("click", () => {
            if (isFormInputValid()) {
                //Valid input

                //Update symptoms check history
                if (localStorage.getItem("symptomsCheckHistory") === null) {
                    //First time user is doing a check
                    localStorage.setItem("lastSymptomsCheckResults", JSON.stringify(getSymptoms()));
                    localStorage.setItem("lastSymptomsCheckDate", model.getFullDate());
                    let lastSymptomsCheckNumSymptoms = JSON.parse(localStorage.getItem("lastSymptomsCheckResults")).length;
                    let lastSymptomsCheckDate = localStorage.getItem("lastSymptomsCheckDate");
                    let historyObject = [{"numberOfSymptoms": lastSymptomsCheckNumSymptoms, "date": lastSymptomsCheckDate}];
                    localStorage.setItem("symptomsCheckHistory", JSON.stringify(historyObject));
                } else {
                    //User has done checks before, so append the results of this check to the history
                    localStorage.setItem("lastSymptomsCheckResults", JSON.stringify(getSymptoms()));
                    localStorage.setItem("lastSymptomsCheckDate", model.getFullDate());
                    let lastSymptomsCheckNumSymptoms = JSON.parse(localStorage.getItem("lastSymptomsCheckResults")).length;
                    let lastSymptomsCheckDate = localStorage.getItem("lastSymptomsCheckDate");
                    let symptomsCheckHistory = JSON.parse(localStorage.getItem("symptomsCheckHistory"));
                    let newHistoryObject = {"numberOfSymptoms": lastSymptomsCheckNumSymptoms, "date": lastSymptomsCheckDate};
                    symptomsCheckHistory.unshift(newHistoryObject);
                    //If history has more than 5 elements, remove the last element in the history
                    if (symptomsCheckHistory.length > 5) {
                        symptomsCheckHistory.pop();
                    }
                    localStorage.setItem("symptomsCheckHistory", JSON.stringify(symptomsCheckHistory));
                }

                //Display results
                if (isFormInputPositive()) {
                    //Display positive results
                    model.hideDiv(symptomsFormDiv);
                    model.showDiv(symptomsResultsDiv);
                    model.showDiv(positiveResultsDiv);
                } else {
                    //Display negative results
                    model.hideDiv(symptomsFormDiv);
                    model.showDiv(symptomsResultsDiv);
                    model.showDiv(negativeResultsDiv);
                }
            } else {
                //Invalid input
                invalidInput.textContent = "You must answer every question before submitting.";
            }
        });

        clearButton.addEventListener("click", () => {
            clearFormInput();
        });
    }

    //Details Page
    if (document.URL.includes("profiledetails.html")) {
        const noChecksDiv = document.getElementById("display-nochecks");
        const positiveDetailsDiv = document.getElementById("display-positive-details");
        const negativeDetailsDiv = document.getElementById("display-negative-details");
        const previousChecksDiv = document.getElementById("display-checks-history");
        const symptomsHistoryDiv = document.getElementById("symptoms-history");
        const eraseDataBtn = document.getElementById("erase-data-btn");

        const displaySymptomsHistory = function () {
            let symptomsCheckHistory = JSON.parse(localStorage.getItem("symptomsCheckHistory"));
            for (let i = 0; i < symptomsCheckHistory.length; i++) {
                let numSymptoms = symptomsCheckHistory[i].numberOfSymptoms;
                let date = symptomsCheckHistory[i].date;

                //Create h1 element
                let h1 = document.createElement("h1");
                h1.classList.add("settings-title");
                if (numSymptoms > 0) {
                    h1.classList.add("negative-symptom");
                } else {
                    h1.classList.add("positive-symptom");
                }
                h1.textContent = `${numSymptoms} symptoms`;

                //Create p element
                let p = document.createElement("p");
                p.classList.add("last-checked-date");
                p.textContent = `${date}`;

                //Add elements to div
                symptomsHistoryDiv.append(h1);
                symptomsHistoryDiv.append(p);

                //Add hr unless the element is the last element in the list
                if (i !== symptomsCheckHistory.length - 1) {
                    let hr = document.createElement("hr");
                    symptomsHistoryDiv.append(hr);
                }
            }
        };

        //Display appropriate content
        if (localStorage.getItem("lastSymptomsCheckDate") === null) {
            model.hideDiv(previousChecksDiv);
            model.showDiv(noChecksDiv);
        } else if (JSON.parse(localStorage.getItem("lastSymptomsCheckResults")).length === 0) {
            document.querySelector(".positive-last-checked").textContent = `Last checked: ${localStorage.getItem("lastSymptomsCheckDate")}`;
            displaySymptomsHistory();
            model.showDiv(positiveDetailsDiv);
        } else {
            document.getElementById("num-of-symptoms").textContent = `${JSON.parse(localStorage.getItem("lastSymptomsCheckResults")).length} symptoms`;
            //Add user's symptoms to symptoms-list div
            const symptomsList = document.getElementById("symptoms-list");
            for (let symptom of JSON.parse(localStorage.getItem("lastSymptomsCheckResults"))) {
                let listElement = document.createElement("LI");
                listElement.classList.add(".symptoms-li");
                listElement.textContent = symptom;
                symptomsList.append(listElement);
            }
            //Add symptoms check date to div
            document.querySelector(".negative-last-checked").textContent = `Last checked: ${localStorage.getItem("lastSymptomsCheckDate")}`;
            displaySymptomsHistory();
            model.showDiv(negativeDetailsDiv);
        }

        //Event Listeners
        eraseDataBtn.addEventListener("click", () => {
            localStorage.removeItem("lastSymptomsCheckDate");
            localStorage.removeItem("lastSymptomsCheckResults");
            localStorage.removeItem("symptomsCheckHistory");
            model.hideDiv(positiveDetailsDiv);
            model.hideDiv(negativeDetailsDiv);
            model.hideDiv(previousChecksDiv);
            model.showDiv(noChecksDiv);
        });
    }

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
        const changeIMGbtn = document.getElementById("changeIMGbtn");
        const profileIMG = document.getElementById("profile-pic");
        const localStatsSettingText = document.getElementById("localstats-setting-text");
        const localStatsSettingBtn = document.getElementById("localstats-setting-btn");
        const dailySymptomsCheckSettingText = document.getElementById("dailysymptomscheck-settings-text");
        const dailySymptomsCheckSettingBtn = document.getElementById("dailysymptomscheck-settings-btn");
        /*
        const symptomsCheckSettingText = document.getElementById("symptomscheck-settings-text");
        const symptomsCheckSettingBtn = document.getElementById("symptomscheck-settings-btn");
        const basicInfoSettingText = document.getElementById("basicinfo-settings-text");
        const basicInfoSettingBtn = document.getElementById("basicinfo-settings-btn");
        const precautionInfoSettingText = document.getElementById("precautioninfo-settings-text");
        const precautionInfoSettingBtn = document.getElementById("precautioninfo-settings-btn");

         */
        const nameChangeBtn = document.getElementById("change-name-button");
        const themeBtn = document.getElementById("theme-btn");
        const themeText = document.getElementById("theme-Text");
        const locationDiv = document.getElementById("active-location");
        const refreshBtn = document.getElementById("refreshLocation");


        changeIMGbtn.addEventListener("click",() =>{
            model.changeProfileimg(this,changeIMGbtn,profileIMG);
        });
        nameChangeBtn.addEventListener("click", () => {
            model.nameChange();
        });

        localStatsSettingBtn.addEventListener("click", () => {
            model.toggleSettingEnabledOrDisabled(localStatsSettingText, localStatsSettingBtn);
            model.saveSettingCheckbox("localBox",localStatsSettingBtn);
            model.saveSettingText("localText",localStatsSettingText);
            model.toggleShowElement(locationDiv);
        });

        refreshBtn.addEventListener("click", () => {
            model.refreshLocation();
        });

        dailySymptomsCheckSettingBtn.addEventListener("click", () => {
            model.toggleSettingEnabledOrDisabled(dailySymptomsCheckSettingText, dailySymptomsCheckSettingBtn);
            model.saveSettingCheckbox("dailySymptomsBox",dailySymptomsCheckSettingBtn);
            model.saveSettingText("dailySymptomsText",dailySymptomsCheckSettingText);
        });
        /*
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

         */

        themeBtn.addEventListener("click",() =>{
            model.toggleTheme(themeText, themeBtn);
        });
    }
};

window.addEventListener("load", initialise);
