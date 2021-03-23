/*global Model, View */ /* a jshint hint */
/*global localStorage: false, setTimeout:false, document:false, console:false, window:false, navigator:false*/
'use strict';


const initialise = evt => {
    let model = new Model();
    let view = new View();

    //FUNCTIONS
    const displayLocalStats = function () {
        check(); //we have to wait for local storage to be populated before we can call the view or else we pass null data
        function check() {
            if (localStorage.getItem("userDefinedTotalDeaths") === null || localStorage.getItem("userDefinedTotalCases") === null || localStorage.getItem("userDefinedLocationAlertLevel") === null || localStorage.getItem("userDefinedLocationNewDeaths") === null || localStorage.getItem("userDefinedLocationNewCases") === null) {
                setTimeout(check, 0);
            } else {
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
        function check() {
            if (localStorage.getItem("nationalTotalCases") === null || localStorage.getItem("firstDoseVaccinated") === null || localStorage.getItem("nationalNewDeaths") === null || localStorage.getItem("nationalTotalCases") === null || localStorage.getItem("nationalNewCases") === null) {
                setTimeout(check, 0);
            } else {
                view.updateNationalNewCases(model.formatNumber(localStorage.getItem("nationalNewCases")), model.formatNumber(localStorage.getItem("nationalNewCasesYesterday"))); //we only want the last day of data not the week
                view.updateNationalNewDeaths(model.formatNumber(localStorage.getItem("nationalNewDeaths")), model.formatNumber(localStorage.getItem("nationalNewDeathsYesterday")));
                view.updateFirstDoseVaccinated(model.formatNumber(localStorage.getItem("firstDoseVaccinated")));
                view.updateNationalTotalCases(model.formatNumber(localStorage.getItem("nationalTotalCases")));
            }
        }
    };

    const displayWorldwideStats = function () {
        check(); //we have to wait for local storage to be populated before we can call the view or else we pass null data
        function check() {
            if (localStorage.getItem("globalTotalCases") === null || localStorage.getItem("globalTotalDeaths") === null || localStorage.getItem("globalNewDeaths") === null || localStorage.getItem("globalNewCases") === null) {
                setTimeout(check, 0);
            } else {
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
        check(); //we have to wait for local storage to be populated before we can call the view or else we pass null data
        function check() {
            if (localStorage.getItem("userLocality") === null) {
                setTimeout(check, 0);
            } else {
                //update stats daily and display the stats
                if (localStorage.getItem("statsLastUpdated") !== model.getDate() && model.getHour() > 6) {
                    model.statUpdate();
                    localStorage.setItem("statsLastUpdated", model.getDate());
                    displayAllStats();
                } else {
                    displayAllStats();
                }
                const statsDates = document.querySelectorAll(".stats-date");
                model.displayDates(statsDates);  //display the date when stats were updated under each statistic
            }
        }
    };


    //INITIALISATION
    initStats();

    //EVENT LISTENERS
    //Index page
    if (document.URL.includes("index.html")) {
        const symptomsButton = document.getElementById("symptoms-btn");

        const profileImage = document.getElementById("profile-pic");
        const profilelocationText = document.getElementById("profile-location");
        const statslocationText = document.getElementById("stats-location");

        view.loadFirstTimeSetup();
        model.getProfileOnly(profileImage);
        view.loadLocation(profilelocationText);
        view.loadLocation(statslocationText);
        view.loadName();
        view.loadToggleLocalStats();

        if (JSON.parse(localStorage.getItem("lastSymptomsCheckResults")) !== null) {
            let numberOfSymptoms = JSON.parse(localStorage.getItem("lastSymptomsCheckResults")).length;
            if (numberOfSymptoms > 0) {
                if (numberOfSymptoms === 1) {
                    symptomsButton.textContent = `1 Symptom`;
                } else {
                    symptomsButton.textContent = `${numberOfSymptoms} Symptoms`;
                }
                symptomsButton.classList.remove("next__button");
                symptomsButton.classList.add("skip__button");
            }
        }
    }
    //Signup page
    if (document.URL.includes("signup.html")) {
        const imgSelectBox = document.getElementById("dropdownMenuButton");
        const profileImage = document.getElementById("signup-profile-pic");
        const firstName = document.getElementById("profile__first-name");
        const lastName = document.getElementById("profile__last-name");
        const nextBtn = document.getElementById("next-button");

        imgSelectBox.addEventListener("change", () => {
            model.imageChange(imgSelectBox, profileImage);
        });

        nextBtn.addEventListener("click", () => {
            model.saveSignupinfo(firstName, lastName, imgSelectBox);
        });
    }

    //Symptoms form page
    if (document.URL.includes("symptomsform.html")) {

        view.loadFirstTimeSetup();

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

        if (noneOfTheAbove.checked ===true) {
            highTemperature.checked = false;
            cough.checked = false;
            lossOfSmell.checked = false;
            shortnessOfBreath.checked = false;
        }

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
                    let historyObject = [{
                        "numberOfSymptoms": lastSymptomsCheckNumSymptoms,
                        "date": lastSymptomsCheckDate
                    }];
                    localStorage.setItem("symptomsCheckHistory", JSON.stringify(historyObject));
                } else {
                    //User has done checks before, so append the results of this check to the history
                    localStorage.setItem("lastSymptomsCheckResults", JSON.stringify(getSymptoms()));
                    localStorage.setItem("lastSymptomsCheckDate", model.getFullDate());
                    let lastSymptomsCheckNumSymptoms = JSON.parse(localStorage.getItem("lastSymptomsCheckResults")).length;
                    let lastSymptomsCheckDate = localStorage.getItem("lastSymptomsCheckDate");
                    let symptomsCheckHistory = JSON.parse(localStorage.getItem("symptomsCheckHistory"));
                    let newHistoryObject = {
                        "numberOfSymptoms": lastSymptomsCheckNumSymptoms,
                        "date": lastSymptomsCheckDate
                    };
                    symptomsCheckHistory.unshift(newHistoryObject);
                    //If history has more than 5 elements, remove the last element in the history
                    if (symptomsCheckHistory.length > 5) {
                        symptomsCheckHistory.pop();
                    }
                    localStorage.setItem("symptomsCheckHistory", JSON.stringify(symptomsCheckHistory));
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
        const noChecksDesc = document.getElementById("no-checks-description");
        const noSymptomsDesc = document.getElementById("no-symptoms-description");
        const detailsTitle = document.getElementById("details-title");
        const profileImage = document.getElementById("profile-pic");

        //Display user's chosen name and profile picture on page
        detailsTitle.textContent = localStorage.getItem("userName");
        view.loadFirstTimeSetup();
        model.getProfileOnly(profileImage);

        //Functions
        const displayPositiveDetails = function () {
            document.getElementById("details-last-checked").classList.add("positive-last-checked");
            document.querySelector(".positive-last-checked").textContent = `Last checked: ${localStorage.getItem("lastSymptomsCheckDate")}`;
            model.showDiv(noSymptomsDesc);
        };

        const displayNegativeDetails = function () {
            model.hideDiv(noSymptomsDesc);
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
                p.classList.add("small__text", "grey__color", "details-history-date");
                p.textContent = `${date}`;

                //Add elements to div
                let div = document.createElement("div");
                div.append(h1);
                div.append(p);
                symptomsHistoryDiv.append(div);

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
            noChecksDesc.textContent = " You have not done any symptoms checks yet. ";
            model.showDiv(noChecksDesc);
        } else if (JSON.parse(localStorage.getItem("lastSymptomsCheckResults")).length === 0) {
            model.hideDiv(noChecksDesc);
            displayPositiveDetails();
            displaySymptomsHistory();
        } else {
            model.hideDiv(noChecksDesc);
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
            noChecksDesc.textContent = " You have not done any symptoms checks yet. ";
            model.showDiv(noChecksDesc);
        });
    }

    //Stats Page
    if (document.URL.includes("statistics.html")) {
        const nationwideStatsButton = document.getElementById("nationwideStatsBtn");
        const worldwideStatsButton = document.getElementById("worldwideStatsBtn");

        const locationText = document.getElementById("stats-location");
        view.loadFirstTimeSetup();
        view.loadLocation(locationText);

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

        view.loadFirstTimeSetup();

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
        const imgSelectBox = document.getElementById("dropdownMenuButton");
        const profileImage = document.getElementById("profile-pic");
        const localStatsSettingText = document.getElementById("localstats-setting-text");
        const locationText = document.getElementById("locationText");
        const localStatsSettingBtn = document.getElementById("localstats-setting-btn");
        const weeklySymptomsCheckSettingText = document.getElementById("weeklysymptomscheck-settings-text");
        const weeklySymptomsCheckSettingBtn = document.getElementById("weeklysymptomscheck-settings-btn");
        const nameChangeBtn = document.getElementById("settings-name-button");
        const nameInput = document.getElementById("profile__first-name");
        const themeBtn = document.getElementById("theme-btn");
        const themeText = document.getElementById("theme-Text");
        const locationDiv = document.getElementById("active-location");
        const refreshBtn = document.getElementById("refreshLocation");


        view.loadFirstTimeSetup();
        view.loadThemeSettings();
        view.loadLocalStatSettings();
        view.loadWeeklyCheckSetting();
        view.loaduserName();
        view.loadLocation(locationText);
        model.getProfilePicture(imgSelectBox, profileImage);

        imgSelectBox.addEventListener("change", () => {
            model.imageChange(imgSelectBox, profileImage);
        });

        nameChangeBtn.addEventListener("click", () => {
            model.saveName(nameInput);
        });

        localStatsSettingBtn.addEventListener("click", () => {
            model.toggleSettingEnabledOrDisabled(localStatsSettingText, localStatsSettingBtn);
            model.saveSettingCheckbox("localBox", localStatsSettingBtn);
            model.saveSettingText("localText", localStatsSettingText);
            model.toggleShowElement(locationDiv);
        });

        refreshBtn.addEventListener("click", () => {
            model.refreshLocation();
        });

        weeklySymptomsCheckSettingBtn.addEventListener("click", () => {
            model.toggleSettingEnabledOrDisabled(weeklySymptomsCheckSettingText, weeklySymptomsCheckSettingBtn);
            model.saveSettingCheckbox("weeklySymptomsBox", weeklySymptomsCheckSettingBtn);
            model.saveSettingText("weeklySymptomsText", weeklySymptomsCheckSettingText);
        });

        themeBtn.addEventListener("click", () => {
            model.toggleTheme(themeText, themeBtn);
        });
    }
        //Search Page
        if (document.URL.includes("search.html")) {

            view.loadFirstTimeSetup();

            const recentSearchesContainer = document.getElementById("recent-searches");
            const infoResultsDiv = document.getElementById("information-results");
            const statsResultsDiv = document.getElementById("stats-results");
            const newsResultsDiv = document.getElementById("news-results");
            const noResultsFound = document.getElementById("no-results-found");
            const searchbarInput = document.getElementById("searchbar-input");
            const searchButton = document.getElementById("submit-button");
            const clearSearchesButton = document.getElementById("clear-button");
            const searchData = [
                {
                    title: "What is coronavirus?",
                    subtitle: "World Health Organization",
                    parent: "information",
                    tags: "",
                    isLink: true,
                    link: "https://www.who.int/health-topics/coronavirus#tab=tab_1"
                },
                {
                    title: "Face coverings",
                    subtitle: "GOV.UK",
                    parent: "information",
                    tags: "masks",
                    isLink: true,
                    link: "https://www.gov.uk/government/publications/face-coverings-when-to-wear-one-and-how-to-make-your-own/face-coverings-when-to-wear-one-and-how-to-make-your-own"
                },
                {
                    title: "Lockdown rules",
                    subtitle: "GOV.UK",
                    parent: "information",
                    tags: "isolation, isolating",
                    isLink: true,
                    link: "https://www.gov.uk/guidance/national-lockdown-stay-at-home"
                },
                {
                    title: "Coronavirus vaccine",
                    subtitle: "NHS",
                    parent: "information",
                    tags: "vaccinations",
                    isLink: true,
                    link: "https://www.nhs.uk/conditions/coronavirus-covid-19/coronavirus-vaccination/coronavirus-vaccine/"
                },
                {
                    title: "Booking a vaccine",
                    subtitle: "NHS",
                    parent: "information",
                    tags: "vaccinations",
                    isLink: true,
                    link: "https://www.nhs.uk/conditions/coronavirus-covid-19/self-isolation-and-treatment/"
                },
                {
                    title: "Self-isolating",
                    subtitle: "NHS",
                    parent: "information",
                    tags: "lockdown, isolation",
                    isLink: true,
                    link: "https://www.nhs.uk/conditions/coronavirus-covid-19/self-isolation-and-treatment/"
                },
                {
                    title: `Stage ${model.formatNumber(localStorage.getItem("userDefinedLocationAlertLevel"))}`,
                    subtitle: "Local",
                    parent: "statistics",
                    tags: "stats, tier, level",
                    isLink: false
                },
                {
                    title: `${model.formatNumber(localStorage.getItem("firstDoseVaccinated"))} first dose vaccinations`,
                    subtitle: "Nationwide",
                    parent: "statistics",
                    tags: "stats, vaccine",
                    isLink: false
                },
                {
                    title: `${model.formatNumber(localStorage.getItem("userDefinedLocationNewCases"))} new cases`,
                    subtitle: "Local",
                    parent: "statistics",
                    tags: "stats",
                    isLink: false
                },
                {
                    title: `${model.formatNumber(localStorage.getItem("nationalNewCases"))} new cases`,
                    subtitle: "Nationwide",
                    parent: "statistics",
                    tags: "stats",
                    isLink: false
                },
                {
                    title: `${model.formatNumber(localStorage.getItem("globalNewCases"))} new cases`,
                    subtitle: "Global",
                    parent: "statistics",
                    tags: "stats",
                    isLink: false
                },
                {
                    title: `${model.formatNumber(localStorage.getItem("userDefinedTotalCases"))} total cases`,
                    subtitle: "Local",
                    parent: "statistics",
                    tags: "stats",
                    isLink: false
                },
                {
                    title: `${model.formatNumber(localStorage.getItem("nationalTotalCases"))} total cases`,
                    subtitle: "Nationwide",
                    parent: "statistics",
                    tags: "stats",
                    isLink: false
                },
                {
                    title: `${model.formatNumber(localStorage.getItem("globalTotalCases"))} total cases`,
                    subtitle: "Global",
                    parent: "statistics",
                    tags: "stats",
                    isLink: false
                },
                {
                    title: `${model.formatNumber(localStorage.getItem("userDefinedLocationNewDeaths"))} new deaths`,
                    subtitle: "Local",
                    parent: "statistics",
                    tags: "stats",
                    isLink: false
                },
                {
                    title: `${model.formatNumber(localStorage.getItem("nationalNewDeaths"))} new deaths`,
                    subtitle: "Nationwide",
                    parent: "statistics",
                    tags: "stats",
                    isLink: false
                },
                {
                    title: `${model.formatNumber(localStorage.getItem("globalNewDeaths"))} new deaths`,
                    subtitle: "Global",
                    parent: "statistics",
                    tags: "stats",
                    isLink: false
                },
                {
                    title: `${model.formatNumber(localStorage.getItem("userDefinedTotalDeaths"))} total deaths`,
                    subtitle: "Local",
                    parent: "statistics",
                    tags: "stats",
                    isLink: false
                },
                {
                    title: `${model.formatNumber(localStorage.getItem("globalTotalDeaths"))} total deaths`,
                    subtitle: "Global",
                    parent: "statistics",
                    tags: "stats",
                    isLink: false
                },
                {
                    title: "UK Biobank scans aim to reveal health legacy",
                    subtitle: "BBC News",
                    parent: "news",
                    tags: "",
                    isLink: true,
                    link: "https://www.bbc.co.uk/news/health-56352138"
                },
                {
                    title: "France eases travel for UK and six other countries",
                    subtitle: "BBC News",
                    parent: "news",
                    tags: "",
                    isLink: true,
                    link: "https://www.bbc.co.uk/news/world-europe-56364290"
                },
                {
                    title: "Homeless people to be prioritised",
                    subtitle: "BBC News",
                    parent: "news",
                    tags: "",
                    isLink: true,
                    link: "https://www.bbc.co.uk/news/health-56364339"
                },
                {
                    title: "Antibody drug cuts Covid ‘hospital admissions and deaths by 85%",
                    subtitle: "The Times",
                    parent: "news",
                    tags: "",
                    isLink: true,
                    link: "https://www.thetimes.co.uk/article/antibody-drug-cuts-covid-hospital-admissions-and-deaths-by-85-pnxdr7dmn"
                },
                {
                    title: "Oklahoma latest state to drop all Covid-19 restrictions",
                    subtitle: "The Independent",
                    parent: "news",
                    tags: "",
                    isLink: true,
                    link: "https://www.independent.co.uk/news/world/americas/us-politics/oklahoma-covid-restrictions-latest-coronavirus-b1815961.html"
                },
                {
                    title: "Biden Takes First Tentative Steps to Address Global Vaccine Shortage",
                    subtitle: "The New York Times",
                    parent: "news",
                    tags: "",
                    isLink: true,
                    link: "https://www.nytimes.com/2021/03/12/us/politics/covid-19-vaccine-global-shortage.html"
                },
                {
                    title: "Global impact of the COVID-19 pandemic: 1 year on",
                    subtitle: "Medical News Today",
                    parent: "news",
                    tags: "",
                    isLink: true,
                    link: "https://www.medicalnewstoday.com/articles/global-impact-of-the-covid-19-pandemic-1-year-on"
                },
                {
                    title: "China's 'vaccine favouritism' risks damaging global fight against pandemic, says expert",
                    subtitle: "Sky News",
                    parent: "news",
                    tags: "",
                    isLink: true,
                    link: "https://news.sky.com/story/covid-19-chinas-vaccine-favouritism-risks-damaging-global-fight-against-pandemic-says-expert-12243343"
                },
            ];

            //Functions
            const getRecentSearches = function () {
                if (localStorage.getItem("recentSearches") === null) {
                    localStorage.setItem("recentSearches", JSON.stringify([]));
                    return [];
                } else {
                    return JSON.parse(localStorage.getItem("recentSearches"));
                }
            };

            const addSearchToRecentSearches = function (search) {
                if (search !== "") {
                    let recentSearches = getRecentSearches();
                    recentSearches.unshift(search);
                    if (recentSearches.length > 5) {
                        recentSearches.pop();
                    }
                    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
                }
            };

            const displayRecentSearches = function () {
                recentSearchesContainer.innerHTML = `<p class="small__text grey__color"> Recent searches </p>`;
                let recentSearches = getRecentSearches();
                if (recentSearches.length === 0) {
                    recentSearchesContainer.innerHTML += `<p id="no-recent-searches">No recent searches.</p>`;
                } else {
                    for (let i = 0; i < recentSearches.length; i++) {
                        let recentSearch = document.createElement("a");
                        recentSearch.innerHTML += `<p>${recentSearches[i]}</p>`;
                        recentSearch.addEventListener("click", () => {
                            clickRecentSearch(i);
                        });
                        recentSearchesContainer.append(recentSearch);
                        if (i !== recentSearches.length - 1) {
                            let hr = document.createElement("hr");
                            recentSearchesContainer.append(hr);
                        }
                    }
                }
            };

            const clickRecentSearch = function (index) {
                //Get recent searches and the search that was clicked
                let recentSearches = getRecentSearches();
                let search = recentSearches[index];

                //Remove the search from the search list and save the new search list in local storage
                recentSearches.splice(index, 1);
                localStorage.setItem("recentSearches", JSON.stringify(recentSearches));

                //Set searchbar input value to be the search
                searchbarInput.value = search;

                //Do the search
                searchFunctionality(search);

                //Update recent searches display
                displayRecentSearches();
            };

            const addResultsToParentContainer = function (resultsArray, container) {
                for (let i = 0; i < resultsArray.length; i++) {
                    if (resultsArray[i].isLink) {
                        //Result links to a page
                        let newResult = `<a><div onclick="window.open('${resultsArray[i].link}','_blank')">
                                    <h1 class="small-title__text"> ${resultsArray[i].title} </h1>
                                    <p class="grey__color"> ${resultsArray[i].subtitle} </p>
                                </div></a>`;
                        container.innerHTML += newResult;
                    } else {
                        //Result does not link to a page
                        let newResult = `<a><div>
                                    <h1 class="small-title__text"> ${resultsArray[i].title} </h1>
                                    <p class="grey__color"> ${resultsArray[i].subtitle} </p>
                                </div></a>`;
                        container.innerHTML += newResult;
                    }
                    //
                    if (i !== resultsArray.length - 1) {
                        let hr = document.createElement("hr");
                        container.append(hr);
                    }
                }
            };

            const hideContainers = function () {
                model.hideDiv(infoResultsDiv);
                model.hideDiv(statsResultsDiv);
                model.hideDiv(newsResultsDiv);
            };

            const searchFunctionality = function (search) {
                if (search !== "") {
                    let infoResultsArr = [];
                    let statsResultsArr = [];
                    let newsResultsArr = [];

                    //Reset the contents of each container
                    infoResultsDiv.innerHTML = `<p class="small__text grey__color"> Information </p>`;
                    statsResultsDiv.innerHTML = `<p class="small__text grey__color"> Statistics </p>`;
                    newsResultsDiv.innerHTML = `<p class="small__text grey__color"> News </p>`;

                    //Add objects to corresponding arrays
                    for (let i = 0; i < searchData.length; i++) {
                        let searchResultTitle = searchData[i].title.toLowerCase();
                        let searchResultSubtitle = searchData[i].subtitle.toLowerCase();
                        let searchResultParent = searchData[i].parent;
                        let searchResultTags = searchData[i].tags;

                        if (searchResultTitle.includes(search) || searchResultSubtitle.includes(search) || searchResultParent.includes(search) || searchResultTags.includes(search)) {
                            //Append result to its parent div
                            if (searchResultParent === "information") {
                                infoResultsArr.push(searchData[i]);
                            }
                            if (searchResultParent === "statistics") {
                                statsResultsArr.push(searchData[i]);
                            }
                            if (searchResultParent === "news") {
                                newsResultsArr.push(searchData[i]);
                            }
                        }
                    }

                    //Add results to their parent containers
                    addResultsToParentContainer(infoResultsArr, infoResultsDiv);
                    addResultsToParentContainer(statsResultsArr, statsResultsDiv);
                    addResultsToParentContainer(newsResultsArr, newsResultsDiv);

                    //Only display containers for which corresponding arrays aren't empty
                    if (infoResultsArr.length === 0 && statsResultsArr.length === 0 && newsResultsArr.length === 0) {
                        //No results found
                        hideContainers();
                        model.showDiv(noResultsFound);
                    } else {
                        //Results found
                        model.hideDiv(noResultsFound);
                        if (infoResultsArr.length === 0) {
                            model.hideDiv(infoResultsDiv);
                        } else {
                            model.showDiv(infoResultsDiv);
                        }

                        if (statsResultsArr.length === 0) {
                            model.hideDiv(statsResultsDiv);
                        } else {
                            model.showDiv(statsResultsDiv);
                        }

                        if (newsResultsArr.length === 0) {
                            model.hideDiv(newsResultsDiv);
                        } else {
                            model.showDiv(newsResultsDiv);
                        }
                    }

                    //Add the search to the recent searches and display it in recent searches
                    addSearchToRecentSearches(search);
                    displayRecentSearches();

                } else {
                    //User tried to search without typing anything
                    defaultDisplay();
                }
            };

            const clearRecentSearches = function () {
                localStorage.setItem("recentSearches", JSON.stringify([]));
                recentSearchesContainer.innerHTML = `<p class="small__text grey__color"> Recent searches </p>`;
                model.hideDiv(noResultsFound);
                searchbarInput.value = "";
            };

            const defaultDisplay = function () {
                searchbarInput.focus();
                displayRecentSearches();
            };

            //Init
            defaultDisplay();

            //Event listeners
            searchButton.addEventListener("click", () => {
                let search = searchbarInput.value.trimEnd().toLowerCase();
                searchFunctionality(search);
            });

            clearSearchesButton.addEventListener("click", () => {
                clearRecentSearches();
                defaultDisplay();
                hideContainers();
            });
        }

};
window.addEventListener("load", initialise);
