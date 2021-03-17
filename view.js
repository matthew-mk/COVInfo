'use strict';

class View{

    constructor() {
    }

    registerClickListener(listener){
        // document.getElementById("xxxxxxx").addEventListener("click", listener);
    }

    // when called by controller will update the number of new cases in glasgow
    updateUserDefinedLocationNewCases(cases, yesterday) {
        if(document.getElementById("user-defined-location-new-cases")!==null){ //checks that the page actually has the div so it doesnt try it on the wrong page
            if(cases > yesterday){
                document.getElementById("user-defined-location-new-cases").innerHTML = cases + " <span class='material-icons' style='color:red'>keyboard_arrow_up</span>";
            }
            else if(cases === yesterday){
                document.getElementById("user-defined-location-new-cases").innerHTML = cases + " <span class='material-icons' style='color:grey'>remove</span>";
            }
            else{
                document.getElementById("user-defined-location-new-cases").innerHTML = cases + " <span class='material-icons' style='color:green'>keyboard_arrow_down</span>";
            }
          }
    }

    updateUserDefinedLocationNewDeaths(cases, yesterday) {
        if(document.getElementById("user-defined-location-new-deaths")!==null){
            if(cases > yesterday){
                document.getElementById("user-defined-location-new-deaths").innerHTML = cases + " <span class='material-icons' style='color:red'>keyboard_arrow_up</span>";
            }
            else if(cases === yesterday){
                document.getElementById("user-defined-location-new-deaths").innerHTML = cases + " <span class='material-icons' style='color:grey'>remove</span>";
            }
            else{
                document.getElementById("user-defined-location-new-deaths").innerHTML = cases + " <span class='material-icons' style='color:green'>keyboard_arrow_down</span>";
            }
        }
    }

    updateUserDefinedLocationAlertLevel(level){
        if(document.getElementById("local-alert-level")!==null){
            document.getElementById("local-alert-level").innerText = level;
        }
    }

    updateUserDefinedTotalCases(cases){
        if(document.getElementById("user-defined-total-cases")!==null){
            document.getElementById("user-defined-total-cases").innerText = cases;
        }
    }

    updateUserDefinedTotalDeaths(deaths){
        if(document.getElementById("user-defined-total-deaths")!==null){
            document.getElementById("user-defined-total-deaths").innerText = deaths;
        }
    }

    updateNationalNewCases(cases, yesterday){
        if(document.getElementById("national-new-cases")!==null){
            if(cases > yesterday){
                document.getElementById("national-new-cases").innerHTML = cases + " <span class='material-icons' style='color:red'>keyboard_arrow_up</span>";
            }
            else if(cases === yesterday){
                document.getElementById("national-new-cases").innerHTML = cases + " <span class='material-icons' style='color:grey'>remove</span>";
            }
            else{
                document.getElementById("national-new-cases").innerHTML = cases + " <span class='material-icons' style='color:green'>keyboard_arrow_down</span>";
            }
        }
    }

    updateNationalTotalCases(cases){
        if(document.getElementById("fourth-box-data")!==null){
            document.getElementById("fourth-box-data").innerHTML = cases;
        }
    }

    updateNationalNewDeaths(cases, yesterday){
        if(document.getElementById("national-new-deaths")!==null){
            if(cases > yesterday){
                document.getElementById("national-new-deaths").innerHTML = cases + " <span class='material-icons' style='color:red'>keyboard_arrow_up</span>";
            }
            else if(cases === yesterday){
                document.getElementById("national-new-deaths").innerHTML = cases + " <span class='material-icons' style='color:grey'>remove</span>";
            }
            else{
                document.getElementById("national-new-deaths").innerHTML = cases + " <span class='material-icons' style='color:green'>keyboard_arrow_down</span>";
            }
        }
    }

    updateFirstDoseVaccinated(total, yesterday){
        if(document.getElementById("first-dose-vaccinated")!==null){
            document.getElementById("first-dose-vaccinated").innerHTML = total;
        }
    }

    //for global data we are just modifying the existing boxes for national so ids are wrongly names but work

    updateGlobalNewCases(cases, yesterday){
        if(document.getElementById("global-new-cases") !== null){
            if(cases > yesterday){
                document.getElementById("global-new-cases").innerHTML = cases + " <span class='material-icons' style='color:red'>keyboard_arrow_up</span>";
            }
            else if(cases === yesterday){
                document.getElementById("global-new-cases").innerHTML = cases + " <span class='material-icons' style='color:grey'>remove</span>";
            }
            else{
                document.getElementById("global-new-cases").innerHTML = cases + " <span class='material-icons' style='color:green'>keyboard_arrow_down</span>";
            }
        }
    }

    updateGlobalNewDeaths(deaths, yesterday){
        if(document.getElementById("global-new-deaths") !== null){
            if(deaths > yesterday){
                document.getElementById("global-new-deaths").innerHTML = deaths + " <span class='material-icons' style='color:red'>keyboard_arrow_up</span>";
            }
            else if(deaths === yesterday){
                document.getElementById("global-new-deaths").innerHTML = deaths + " <span class='material-icons' style='color:grey'>remove</span>";
            }
            else{
                document.getElementById("global-new-deaths").innerHTML = deaths + " <span class='material-icons' style='color:green'>keyboard_arrow_down</span>";
            }
        }
    }

    updateGlobalTotalDeaths(deaths){
        if(document.getElementById("global-total-deaths") !== null){
            document.getElementById("global-total-deaths").innerText = deaths;
        }
    }

    updateGlobalTotalCases(cases){
        if(document.getElementById("global-total-cases") !== null){
            document.getElementById("global-total-cases").innerText = cases;
        }
    }

}
