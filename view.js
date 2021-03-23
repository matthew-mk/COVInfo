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
                document.getElementById("user-defined-location-new-cases").innerHTML = cases + " <span class='material-icons opposite__color'>trending_up</span>";
            }
            else if(cases === yesterday){
                document.getElementById("user-defined-location-new-cases").innerHTML = cases + " <span class='material-icons grey__color'>arrow_right_alt</span>";
            }
            else{
                document.getElementById("user-defined-location-new-cases").innerHTML = cases + " <span class='material-icons green__color'>trending_down</span>";
            }
          }
    }

    updateUserDefinedLocationNewDeaths(cases, yesterday) {
        if(document.getElementById("user-defined-location-new-deaths")!==null){
            if(cases > yesterday){
                document.getElementById("user-defined-location-new-deaths").innerHTML = cases + " <span class='material-icons opposite__color'>trending_up</span>";
            }
            else if(cases === yesterday){
                document.getElementById("user-defined-location-new-deaths").innerHTML = cases + " <span class='material-icons grey__color'>arrow_right_alt</span>";
            }
            else{
                document.getElementById("user-defined-location-new-deaths").innerHTML = cases + " <span class='material-icons green__color'>trending_down</span>";
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
            document.getElementById("user-defined-total-cases").innerHTML = cases + " <span class='material-icons opposite__color'>trending_up</span>";
        }
    }

    updateUserDefinedTotalDeaths(deaths){
        if(document.getElementById("user-defined-total-deaths")!==null){
            document.getElementById("user-defined-total-deaths").innerHTML = deaths + " <span class='material-icons opposite__color'>trending_up</span>";
        }
    }

    updateNationalNewCases(cases, yesterday){
        if(document.getElementById("national-new-cases")!==null){
            if(cases > yesterday){
                document.getElementById("national-new-cases").innerHTML = cases + " <span class='material-icons opposite__color'>trending_up</span>";
            }
            else if(cases === yesterday){
                document.getElementById("national-new-cases").innerHTML = cases + " <span class='material-icons grey__color'>arrow_right_alt</span>";
            }
            else{
                document.getElementById("national-new-cases").innerHTML = cases + " <span class='material-icons green__color'>trending_down</span>";
            }
        }
    }

    updateNationalTotalCases(cases){
        if(document.getElementById("fourth-box-data")!==null){
            document.getElementById("fourth-box-data").innerHTML = cases + " <span class='material-icons opposite__color'>trending_up</span>";
        }
    }

    updateNationalNewDeaths(cases, yesterday){
        if(document.getElementById("national-new-deaths")!==null){
            if(cases > yesterday){
                document.getElementById("national-new-deaths").innerHTML = cases + " <span class='material-icons opposite__color'>trending_up</span>";
            }
            else if(cases === yesterday){
                document.getElementById("national-new-deaths").innerHTML = cases + " <span class='material-icons grey__color'>arrow_right_alt</span>";
            }
            else{
                document.getElementById("national-new-deaths").innerHTML = cases + " <span class='material-icons green__color'>trending_down</span>";
            }
        }
    }

    updateFirstDoseVaccinated(total, yesterday){
        if(document.getElementById("first-dose-vaccinated")!==null){
            document.getElementById("first-dose-vaccinated").innerHTML = total + " <span class='material-icons green__color'>trending_up</span>";
        }
    }

    //for global data we are just modifying the existing boxes for national so ids are wrongly names but work

    updateGlobalNewCases(cases, yesterday){
        if(document.getElementById("global-new-cases") !== null){
            if(cases > yesterday){
                document.getElementById("global-new-cases").innerHTML = cases + " <span class='material-icons opposite__color'>trending_up</span>";
            }
            else if(cases === yesterday){
                document.getElementById("global-new-cases").innerHTML = cases + " <span class='material-icons grey__color'>arrow_right_alt</span>";
            }
            else{
                document.getElementById("global-new-cases").innerHTML = cases + " <span class='material-icons green__color'>trending_down</span>";
            }
        }
    }

    updateGlobalNewDeaths(deaths, yesterday){
        if(document.getElementById("global-new-deaths") !== null){
            if(deaths > yesterday){
                document.getElementById("global-new-deaths").innerHTML = deaths + " <span class='material-icons opposite__color'>trending_up</span>";
            }
            else if(deaths === yesterday){
                document.getElementById("global-new-deaths").innerHTML = deaths + " <span class='material-icons grey__color'>arrow_right_alt</span>";
            }
            else{
                document.getElementById("global-new-deaths").innerHTML = deaths + " <span class='material-icons green__color'>trending_down</span>";
            }
        }
    }

    updateGlobalTotalDeaths(deaths){
        if(document.getElementById("global-total-deaths") !== null){
            document.getElementById("global-total-deaths").innerHTML = deaths + " <span class='material-icons opposite__color'>trending_up</span>";
        }
    }

    updateGlobalTotalCases(cases){
        if(document.getElementById("global-total-cases") !== null){
            document.getElementById("global-total-cases").innerHTML = cases + " <span class='material-icons opposite__color'>trending_up</span>";
        }
    }
    //INDEX

    loadFirstTimeSetup(){
        if (localStorage.getItem("userName") === null || localStorage.getItem("userName") === "Your Name" ){
            location.replace("signup.html");
        }
    }

    loadName(){
        if (localStorage.getItem("userName") === null) {
            localStorage.setItem("userName","Your Name");
        }
        document.getElementById("profile-name").innerHTML = localStorage.getItem("userName");
    }

    loadToggleLocalStats(){
        if(localStorage.getItem("localBox") === "false" || localStorage.getItem("userLocality") === null){
            document.getElementById("profile-location").style.visibility = "hidden";
        }

        let x = document.getElementById("local-stats");
        if(localStorage.getItem("localBox") === "false"){
            x.style.display = "none";
        }
        else{
            x.style.display = "block";
        }
    }



    //SETTINGS
    loadThemeSettings(){
        let checked = JSON.parse(localStorage.getItem("theme-btn"));
        document.getElementById("theme-btn").checked = checked;

        if (localStorage.getItem("theme-text") === null){
            localStorage.setItem("theme-text","Light");
        }
        document.getElementById("theme-Text").innerHTML = localStorage.getItem("theme-text");
    }

    loadLocation(element){
        let city = localStorage.getItem("userLocality");
        let country = localStorage.getItem("userCountry");

        element.innerHTML = city + ", " + country;
    }

    loadLocalStatSettings(){
        let setting1 = JSON.parse(localStorage.getItem("localBox"));
        if (setting1 === null){
            setting1 = false;
        }
        document.getElementById("localstats-setting-btn").checked = setting1;
        if (setting1 === false){
            document.getElementById("active-location").style.display = "none";
            document.getElementById("localSettingLine").style.display= "none";
        }
        if (localStorage.getItem("localText") === null){
            localStorage.setItem("localText","Disabled");
        }

        document.getElementById("localstats-setting-text").innerHTML = localStorage.getItem("localText");
    }

    loadWeeklyCheckSetting(){
        let setting2 = JSON.parse(localStorage.getItem("weeklySymptomsBox"));
        if (setting2 === null){
            setting2 = true;
        }
        document.getElementById("weeklysymptomscheck-settings-btn").checked = setting2;
        if (localStorage.getItem("weeklySymptomsText") === null){
            localStorage.setItem("weeklySymptomsText","Enabled");
        }
        document.getElementById("weeklysymptomscheck-settings-text").innerHTML = localStorage.getItem("weeklySymptomsText") ;
    }

    loaduserName(){
        let username = localStorage.getItem("userName");
        if (username === null){
            username = "Your Name";
        }
        document.getElementById("profile__first-name").value = username;
    }

}
