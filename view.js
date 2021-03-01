'use strict';

class View{
    statsDates = document.querySelectorAll(".box-date");
    nationwideStatsButton = document.getElementById("nationwideStatsBtn");
    worldwideStatsButton = document.getElementById("worldwideStatsBtn");
    nationwideNewsButton = document.getElementById("nationwideNewsBtn");
    worldwideNewsButton = document.getElementById("worldwideNewsBtn");

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
