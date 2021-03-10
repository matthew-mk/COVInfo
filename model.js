/*jshint globalstrict: true*/
/*global localStorage: false, console: false, $: false, document:false, location:false*/
'use strict';

class Model{

    constructor() {
        if (localStorage.getItem("statsLastUpdated") !== this.getDate()) {
            //Most data is given as an array of the last 7 days data
            this.nationalNewCases = this.setNationalData("newCasesByPublishDate");
            this.nationalNewDeaths = this.setNationalData("newDeaths28DaysByPublishDate");
            this.firstDoseVaccinated = this.setNationalData("cumPeopleVaccinatedFirstDoseByPublishDate");
            this.nationalTotalCases = this.setNationalData("cumCasesByPublishDate");
            //USER INPUT WILL BE ADDED
            this.userDefinedLocationNewCases = this.setLocalData("Glasgow City", "newCasesByPublishDate");  //SET GLASGOW CITY TEMP WILL EVENTUALLY BE USERS DECISION
            this.userDefinedLocationNewDeaths = this.setLocalData("Glasgow City", "newDeaths28DaysByPublishDate");
            this.userDefinedLocationAlertLevel = this.setLocalData("Glasgow City", "alertLevel");
            //Global data
            this.globalNewCases = this.setGlobalData("newCases");
            this.globalNewDeaths = this.setGlobalData("newDeaths");
            this.globalTotalDeaths = this.setGlobalData("totalDeaths");
            this.globalTotalCases = this.setGlobalData("totalCases");
        }
    }

    //National Data and specific location data uses a different api call to get so use correct function.
    //setNationalData is only for returning uk wide data
    //setLocalData is used to return data for a specific area in the uk e.g. 'Glasgow City', 'Stirling'

    setNationalData(typeOfData) { // VALID INPUTS: newCasesByPublishDate, newDeaths28DaysByPublishDate, cumPeopleVaccinatedFirstDoseByPublishDate
        let returnData; // data to be returned
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure={%22date%22:%22date%22,%22"+typeOfData+"%22:%22"+typeOfData+"%22}",
            async: false, //MUST BE ASYNC FALSE
            success: function(data){
                let tempArr = data.data;
                tempArr.length = 6; //only want last 7 days
                returnData = tempArr;
            }
        });
        if(typeOfData === "newCasesByPublishDate"){
            this.nationalNewCases = returnData;
        }
        else if(typeOfData === "newCasesByPublishDate"){
            this.nationalNewDeaths = returnData;
        }
        else if(typeOfData === "cumPeopleVaccinatedFirstDoseByPublishDate"){
            this.firstDoseVaccinated = returnData;
        }
        else if(typeOfData === "cumCasesByPublishDate"){
            this.nationalTotalCases = returnData;
        }
        return returnData;
    }

    setLocalData(location, typeOfData) {
        let returnData;
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "https://api.coronavirus.data.gov.uk/v1/data?filters=areaName="+location+"&structure={%22date%22:%22date%22,%22"+typeOfData+"%22:%22"+typeOfData+"%22}",
            async: false, //MUST BE ASYNC FALSE
            success: function(data){
                let tempArr = data.data;
                tempArr.length = 6; //only want last 7 days
                returnData = tempArr;
            }
        });
        if(typeOfData === "newCasesByPublishDate"){
            this.userDefinedLocationNewCases = returnData;
        }
        else if(typeOfData === "newCasesByPublishDate"){
            this.userDefinedLocationNewDeaths = returnData;
        }
        else if(typeOfData === "alertLevel"){
            this.userDefinedLocationAlertLevel = returnData;
        }
        return returnData;
    }

    setGlobalData(typeOfData) { 
        let returnData;
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "https://api.covid19api.com/summary",
            async: false, //MUST BE ASYNC FALSE
            success: function(data){
                let tempArr = data.Global;
                returnData = tempArr;
            }
        });
        if(typeOfData === "newCases"){
            this.globalNewCases = returnData.NewConfirmed;
            return this.globalNewCases;
        }
        if(typeOfData === "newDeaths"){
            this.globalNewDeaths = returnData.NewDeaths;
            return this.globalNewDeaths;
        }
        if(typeOfData === "totalDeaths"){
            this.globalTotalDeaths = returnData.TotalDeaths;
            return this.globalTotalDeaths;
        }
        if(typeOfData === "totalCases"){
            this.globalTotalCases = returnData.TotalConfirmed;
            return this.globalTotalCases;
        }
    }

    storeUpdatedStats() {
        localStorage.setItem("userDefinedLocationNewCases", this.getUserDefinedLocationNewCases()[0].newCasesByPublishDate);
        localStorage.setItem("userDefinedLocationNewDeaths", this.getUserDefinedLocationNewDeaths()[0].newDeaths28DaysByPublishDate);
        localStorage.setItem("userDefinedLocationAlertLevel", this.userDefinedLocationAlertLevel[0].alertLevel);
        localStorage.setItem("nationalNewCases", this.getNationalNewCases()[0].newCasesByPublishDate);
        localStorage.setItem("nationalNewDeaths", this.getNationalNewDeaths()[0].newDeaths28DaysByPublishDate);
        localStorage.setItem("firstDoseVaccinated", this.getFirstDoseVaccinated()[0].cumPeopleVaccinatedFirstDoseByPublishDate);
        localStorage.setItem("nationalTotalCases", this.nationalTotalCases[0].cumCasesByPublishDate);
        localStorage.setItem("globalNewCases", this.globalNewCases);
        localStorage.setItem("globalNewDeaths", this.globalNewDeaths);
        localStorage.setItem("globalTotalDeaths", this.globalTotalDeaths);
        localStorage.setItem("globalTotalCases", this.globalTotalCases);
        localStorage.setItem("statsLastUpdated", this.getDate());
        console.log("Stats updated!");
    }

    displayDates(dates) {
        if (localStorage.getItem("statsLastUpdated")) {
            for (let d of dates) {
                d.textContent = this.getDate();
            }
        }
    }

    showDiv(element) {
        element.style.display = "block";
    }

    hideDiv(element) {
        element.style.display = "none";
    }

    toggleNationwide(nationwideButton, worldwideButton) {
        nationwideButton.classList.add("selected-btn");
        worldwideButton.classList.remove("selected-btn");
    }

    toggleWorldwide(nationwideButton, worldwideButton) {
        worldwideButton.classList.add("selected-btn");
        nationwideButton.classList.remove("selected-btn");
    }

    toggleSettingEnabledOrDisabled(text, btn) {
        if (btn.checked === true) {
            text.textContent = "Enabled";
        } else {
            text.textContent = "Disabled";
        }
    }

    saveSettingCheckbox(settingType,btn){
        localStorage.setItem(settingType, btn.checked);
    }

    saveSettingText(settingType,textElement){
        if (textElement.innerHTML === "Enabled"){
            localStorage.setItem(settingType, "Enabled");
        }else{
            localStorage.setItem(settingType, "Disabled");
        }
    }

    toggleTheme(text,btn){
        let sheet = "";
        let setTheme = localStorage.getItem("theme");
        let themeBox = document.getElementById("theme-btn");
        if (setTheme === null){
            sheet = "css/myapp.css";
            localStorage.setItem("theme",sheet);
        } else{
            sheet = setTheme;
            localStorage.setItem("theme",sheet);
        }

        if (btn.checked === true){
            text.textContent = "Dark";
            sheet = "css/darkTheme.css";
            localStorage.setItem("theme",sheet);
            localStorage.setItem("theme-text","Dark");
            localStorage.setItem("theme-btn",themeBox.checked);
            location.reload();
        } else{
            text.textContent = "Light";
            sheet = "css/myapp.css";
            localStorage.setItem("theme",sheet);
            localStorage.setItem("theme-text","Light");
            localStorage.setItem("theme-btn",themeBox.checked);
            location.reload();
        }
    }

    save() {
        let themeBox = document.getElementById("theme-btn");
        localStorage.setItem("theme-btn",themeBox.checked);
    }

    getUserDefinedLocationNewCases(){
        return this.userDefinedLocationNewCases;
    }

    getUserDefinedLocationNewDeaths(){
        return this.userDefinedLocationNewDeaths;
    }

    getNationalNewCases(){
        return this.nationalNewCases;
    }

    getNationalNewDeaths(){
        return this.nationalNewDeaths;
    }

    getFirstDoseVaccinated(){
        return this.firstDoseVaccinated;
    }

    getDate(){
        const dateNumToName = {
            1: "Jan",
            2: "Feb",
            3: "Mar",
            4: "Apr",
            5: "May",
            6: "June",
            7: "July",
            8: "Aug",
            9: "Sep",
            10: "Oct",
            11: "Nov",
            12: "Dec"
        };

        let day = new Date().getDate();
        let monthNum = new Date().getMonth() + 1;
        let monthName = dateNumToName[monthNum];
        return (day + " " + monthName);
    }

    getFullDate(){
        let day = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        console.log(day + "/" + month + "/" + year);
        return (day + "/" + month + "/" + year);
    }
    
    // adds commas to numbers & formats
    formatNumber(num){
        return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
}

