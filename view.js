'use strict';

class View{
    //stats elements
    statsDates = document.querySelectorAll(".box-date");
    nationwideStatsButton = document.getElementById("nationwideStatsBtn");
    worldwideStatsButton = document.getElementById("worldwideStatsBtn");
    nationwideNewsButton = document.getElementById("nationwideNewsBtn");
    worldwideNewsButton = document.getElementById("worldwideNewsBtn");
    nationwideNewsDiv = document.getElementById("nationwide-news");
    worldwideNewsDiv = document.getElementById("worldwide-news");

    //settings elements
    localStatsSettingText = document.getElementById("localstats-setting-text");
    localStatsSettingBtn = document.getElementById("localstats-setting-btn");
    dailySymptomsCheckSettingText = document.getElementById("dailysymptomscheck-settings-text");
    dailySymptomsCheckSettingBtn = document.getElementById("dailysymptomscheck-settings-btn");
    symptomsCheckSettingText = document.getElementById("symptomscheck-settings-text");
    symptomsCheckSettingBtn = document.getElementById("symptomscheck-settings-btn");
    basicInfoSettingText = document.getElementById("basicinfo-settings-text");
    basicInfoSettingBtn = document.getElementById("basicinfo-settings-btn");
    precautionInfoSettingText = document.getElementById("precautioninfo-settings-text");
    precautionInfoSettingBtn = document.getElementById("precautioninfo-settings-btn");
    themeBtn = document.getElementById("theme-btn");
    themeText = document.getElementById("theme-Text");

    constructor() {
    }

    registerClickListener(listener){
        // document.getElementById("xxxxxxx").addEventListener("click", listener);
    }

    // when called by controller will update the number of new cases in glasgow
    updateUserDefinedLocationNewCases(cases) {
        if(document.getElementById("user-defined-location-new-cases")!=null){ //checks that the page actually has the div so it doesnt try it on the wrong page
            document.getElementById("user-defined-location-new-cases").innerText = cases;
          }
    }

    updateUserDefinedLocationNewDeaths(cases) {
        if(document.getElementById("user-defined-location-new-deaths")!=null){
            document.getElementById("user-defined-location-new-deaths").innerText = cases;
        }
    }

    updateNationalNewCases(cases){
        if(document.getElementById("national-new-cases")!=null){
            document.getElementById("national-new-cases").innerText = cases;
        }
    }

    updateNationalNewDeaths(cases){
        if(document.getElementById("national-new-deaths")!=null){
            document.getElementById("national-new-deaths").innerText = cases;
        }
    }

    updateFirstDoseVaccinated(total){
        if(document.getElementById("first-dose-vaccinated")!=null){
            document.getElementById("first-dose-vaccinated").innerText = total;
        }
    }

}
