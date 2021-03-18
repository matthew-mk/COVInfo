'use strict';
/*global Model, View */ /* a jshint hint */


const initialise = evt => {
    let model = new Model();
    let view = new View();

    //FUNCTIONS
    const displayLocalStats = function () {
        check(); //we have to wait for local storage to be populated before we can call the view or else we pass null data
        function check(){
            if(localStorage.getItem("userDefinedTotalDeaths") === null || localStorage.getItem("userDefinedTotalCases") === null || localStorage.getItem("userDefinedLocationAlertLevel") === null || localStorage.getItem("userDefinedLocationNewDeaths") === null || localStorage.getItem("userDefinedLocationNewCases") === null){
                setTimeout(check, 0);
            }
            else{
                view.updateUserDefinedLocationNewCases(model.formatNumber(localStorage.getItem("userDefinedLocationNewCases")), model.formatNumber(localStorage.getItem("userDefinedLocationNewCasesYesterday")));
                view.updateUserDefinedLocationNewDeaths(model.formatNumber(localStorage.getItem("userDefinedLocationNewDeaths")), model.formatNumber(localStorage.getItem("userDefinedLocationNewDeathsYesterday")));
                view.updateUserDefinedLocationAlertLevel(model.formatNumber(localStorage.getItem("userDefinedLocationAlertLevel")));
                view.updateUserDefinedTotalCases(model.formatNumber(localStorage.getItem("userDefinedTotalCases")));
                view.updateUserDefinedTotalDeaths(model.formatNumber(localStorage.getItem("userDefinedTotalDeaths")));
            }
        }
    };

    const displayNationwideStats = function () {
        check(); //we have to wait for local storage to be populated before we can call the view or else we pass null data
        function check(){
            if(localStorage.getItem("nationalTotalCases") === null || localStorage.getItem("firstDoseVaccinated") === null || localStorage.getItem("nationalNewDeaths") === null || localStorage.getItem("nationalTotalCases") === null || localStorage.getItem("nationalNewCases") === null){
                setTimeout(check, 0);
            }
            else{
                view.updateNationalNewCases(model.formatNumber(localStorage.getItem("nationalNewCases")), model.formatNumber(localStorage.getItem("nationalNewCasesYesterday"))); //we only want the last day of data not the week
                view.updateNationalNewDeaths(model.formatNumber(localStorage.getItem("nationalNewDeaths")), model.formatNumber(localStorage.getItem("nationalNewDeathsYesterday")));
                view.updateFirstDoseVaccinated(model.formatNumber(localStorage.getItem("firstDoseVaccinated")));
                view.updateNationalTotalCases(model.formatNumber(localStorage.getItem("nationalTotalCases")));
            }
        }
    };

    const displayWorldwideStats = function () {
        check(); //we have to wait for local storage to be populated before we can call the view or else we pass null data
        function check(){
            if(localStorage.getItem("globalTotalCases") === null || localStorage.getItem("globalTotalDeaths") === null || localStorage.getItem("globalNewDeaths") === null || localStorage.getItem("globalNewCases") === null){
                setTimeout(check, 0);
            }
            else{
                view.updateGlobalNewCases(model.formatNumber(localStorage.getItem("globalNewCases")), model.formatNumber(localStorage.getItem("globalNewCasesYesterday")));
                view.updateGlobalNewDeaths(model.formatNumber(localStorage.getItem("globalNewDeaths")), model.formatNumber(localStorage.getItem("globalNewDeathsYesterday")));
                view.updateGlobalTotalDeaths(model.formatNumber(localStorage.getItem("globalTotalDeaths")));
                view.updateGlobalTotalCases(model.formatNumber(localStorage.getItem("globalTotalCases")));
            }
        }
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
            localStorage.setItem("statsLastUpdated", model.getDate());
            displayAllStats();
        } else {
            displayAllStats();
        }
        const statsDates = document.querySelectorAll(".stats-date");
        model.displayDates(statsDates);  //display the date when stats were updated under each statistic
    };


    //INITIALISATION
    initStats();
    view.loadTheme();

    //EVENT LISTENERS
    //Index page
    if (document.URL.includes("index.html")) {
        const symptomsButton = document.getElementById("symptoms-btn");

        const profileImage = document.getElementById("profile-pic");
        model.getProfileOnly(profileImage);
        view.loadName();
        view.loadToggleLocalStats();

        if (JSON.parse(localStorage.getItem("lastSymptomsCheckResults")) !== null) {
            let numberOfSymptoms = JSON.parse(localStorage.getItem("lastSymptomsCheckResults")).length;
            if (numberOfSymptoms > 0) {
                if (numberOfSymptoms === 1) {
                    symptomsButton.textContent = `1 symptom`;
                } else {
                    symptomsButton.textContent = `${numberOfSymptoms} symptoms`;
                }
                symptomsButton.style.backgroundColor = "#f8c4c1";
                symptomsButton.style.color = "#e96b64";
            }
        }
    }

    //Symptoms form page
    if (document.URL.includes("symptomsform.html")) {
        const symptomsFormDiv = document.getElementById("symptoms-form-container");
        const symptomsResultsContainer = document.getElementById("symptoms-results-container");
        const symptomsDetailsDiv = document.getElementById("symptoms-details");
        const symptomsResultsDiv = document.getElementById("symptoms-results");
        const submitButton = document.getElementById("submit-button");
        const clearButton = document.getElementById("clear-button");
        const highTemperature = document.getElementById("highTemperature");
        const cough = document.getElementById("cough");
        const lossOfSmell = document.getElementById("lossOfSmell");
        const shortnessOfBreath = document.getElementById("shortnessOfBreath");
        const noneOfTheAbove = document.getElementById("noneOfTheAbove");

        const clearFormInput = function () {
            highTemperature.checked = false;
            cough.checked = false;
            lossOfSmell.checked = false;
            shortnessOfBreath.checked = false;
            noneOfTheAbove.checked = false;
        };

        const isFormInputValid = function () {
            if ((!noneOfTheAbove.checked) && (highTemperature.checked || cough.checked || lossOfSmell.checked || shortnessOfBreath.checked)) {
                return true;
            }
            if ((noneOfTheAbove.checked) && (!highTemperature.checked && !cough.checked && !lossOfSmell.checked && !shortnessOfBreath.checked)) {
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
            if (shortnessOfBreath.checked) {
                symptoms.push("Shortness of breath");
            }
            return symptoms;
        };

        const isFormInputPositive = function () {
            return getSymptoms().length <= 0;
        };

        const displayPositiveResults = function () {
            symptomsDetailsDiv.classList.remove("opposite__color", "opposite__box");
            symptomsDetailsDiv.classList.add("accent__color", "accent__box");
            document.getElementById("symptoms-results-title").innerHTML = `Your answers <span class="accent__color"> do not </span> suggest you have the coronavirus infection.`;
            document.getElementById("symptoms-details-title").innerText = "Consider calling NHS 111";
            document.getElementById("symptoms-details-description").innerHTML = `                
                <p> If you are unwell, consider calling 111 and tell them that: </p>
                <ul>
                    <li> You have done this self help guide.</li>
                    <li> Your answers do not suggest that you might be at risk of having coronavirus, but you still feel unwell.</li>
                </ul>`;
        };

        const displayNegativeResults = function () {
            symptomsDetailsDiv.classList.remove("accent__color", "accent__box");
            symptomsDetailsDiv.classList.add("opposite__color", "opposite__box");
            document.getElementById("symptoms-results-title").innerHTML = `Your answers suggest you <span style="color: red"> may be at risk</span> of having the coronavirus infection.`;
            document.getElementById("symptoms-details-title").innerText = "Call NHS 111";
            document.getElementById("symptoms-details-description").innerHTML = `                
                <p> Please phone 111 now and tell them: </p>
                <ul>
                    <li> You have done this self help guide.</li>
                    <li> Your answers suggest that you might be at risk of having coronavirus, because you have 1 or more of the coronavirus symptoms.</li>
                </ul>`;
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
                    displayPositiveResults();
                } else {
                    displayNegativeResults();
                }

            } else {
                //Invalid input
                console.log("Invalid input");
            }
        });

        clearButton.addEventListener("click", () => {
            clearFormInput();
        });
    }

    //Details Page
    if (document.URL.includes("profiledetails.html")) {
        const symptomsDetailsDiv = document.getElementById("display-symptoms-details");
        const symptomsHistoryDiv = document.getElementById("symptoms-history");
        const eraseDataBtn = document.getElementById("erase-data-btn");

        const profileImage = document.getElementById("profile-pic");
        model.getProfileOnly(profileImage);

        const displayPositiveDetails = function () {
            document.getElementById("details-last-checked").classList.add("positive-last-checked");
            document.querySelector(".positive-last-checked").textContent = `Last checked: ${localStorage.getItem("lastSymptomsCheckDate")}`;

        };

        const displayNegativeDetails = function () {
            symptomsDetailsDiv.classList.remove("accent__box", "accent__color");
            symptomsDetailsDiv.classList.add("opposite__box", "opposite__color");
            document.getElementById("details-last-checked").classList.add("negative-last-checked");
            document.querySelector(".negative-last-checked").textContent = `Last checked: ${localStorage.getItem("lastSymptomsCheckDate")}`;
        };

        const displaySymptomsHistory = function () {
            let symptomsCheckHistory = JSON.parse(localStorage.getItem("symptomsCheckHistory"));
            for (let i = 0; i < symptomsCheckHistory.length; i++) {
                let numSymptoms = symptomsCheckHistory[i].numberOfSymptoms;
                let date = symptomsCheckHistory[i].date;

                //Create h1 element
                let h1 = document.createElement("h1");
                h1.classList.add("small-title__text", "details-history-title");
                if (numSymptoms > 0) {
                    h1.classList.add("opposite__color");
                    if (numSymptoms === 1) {
                        h1.textContent = `1 symptom`;
                    } else {
                        h1.textContent = `${numSymptoms} symptoms`;
                    }
                } else {
                    h1.classList.add("accent__color");
                    h1.textContent = "No symptoms";
                }

                //Create p element
                let p = document.createElement("p");
                p.classList.add("small__text", "details-history-date");
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
            model.hideDiv(symptomsDetailsDiv);
            document.getElementById("no-checks-description").textContent = "You have not done any symptoms checks yet.";
        } else if (JSON.parse(localStorage.getItem("lastSymptomsCheckResults")).length === 0) {
            displayPositiveDetails();
            displaySymptomsHistory();
        } else {
            let numberOfSymptoms = JSON.parse(localStorage.getItem("lastSymptomsCheckResults")).length;
            if (numberOfSymptoms === 1) {
                document.getElementById("num-of-symptoms").textContent = "1 symptom";
            } else {
                document.getElementById("num-of-symptoms").textContent = `${numberOfSymptoms} symptoms`;
            }
            //Add user's symptoms to symptoms-list div
            const symptomsList = document.getElementById("symptoms-list");
            for (let symptom of JSON.parse(localStorage.getItem("lastSymptomsCheckResults"))) {
                let listElement = document.createElement("LI");
                listElement.classList.add(".symptoms-li");
                listElement.textContent = symptom;
                symptomsList.append(listElement);
            }
            //Add symptoms check date to div
            displayNegativeDetails();
            displaySymptomsHistory();
        }

        //Event Listeners
        eraseDataBtn.addEventListener("click", () => {
            localStorage.removeItem("lastSymptomsCheckDate");
            localStorage.removeItem("lastSymptomsCheckResults");
            localStorage.removeItem("symptomsCheckHistory");
            model.hideDiv(symptomsDetailsDiv);
            symptomsHistoryDiv.innerHTML = "";
            document.getElementById("no-checks-description").textContent = "You have not done any symptoms checks yet.";
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
        const imgSelectBox = document.getElementById("image-select");
        const profileImage = document.getElementById("profile-pic");
        const localStatsSettingText = document.getElementById("localstats-setting-text");
        const localStatsSettingBtn = document.getElementById("localstats-setting-btn");
        const weeklySymptomsCheckSettingText = document.getElementById("weeklysymptomscheck-settings-text");
        const weeklySymptomsCheckSettingBtn = document.getElementById("weeklysymptomscheck-settings-btn");
        const nameChangeBtn = document.getElementById("change-name-button");
        const themeBtn = document.getElementById("theme-btn");
        const themeText = document.getElementById("theme-Text");
        const locationDiv = document.getElementById("active-location");
        const refreshBtn = document.getElementById("refreshLocation");

        view.loadThemeSettings();
        view.loadLocalStatSettings();
        view.loadWeeklyCheckSetting();
        model.getProfilePicture(imgSelectBox,profileImage);

        imgSelectBox.addEventListener("change", () => {
            model.imageChange(imgSelectBox,profileImage);
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


        weeklySymptomsCheckSettingBtn.addEventListener("click", () => {
            model.toggleSettingEnabledOrDisabled(weeklySymptomsCheckSettingText, weeklySymptomsCheckSettingBtn);
            model.saveSettingCheckbox("weeklySymptomsBox",weeklySymptomsCheckSettingBtn);
            model.saveSettingText("weeklySymptomsText",weeklySymptomsCheckSettingText);
        });

        themeBtn.addEventListener("click",() =>{
            model.toggleTheme(themeText, themeBtn);
        });
    }
};

window.addEventListener("load", initialise);
