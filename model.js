/*jshint globalstrict: true*/
/*global localStorage: false, console: false, $: false, document:false, location:false*/
/*jshint esversion: 8 */

'use strict';

class Model{
    constructor() {
        if (localStorage.getItem("statsLastUpdated") !== this.getDate()) {
            this.statUpdate();
        }
    }

    displayDates(dates) {
        if (localStorage.getItem("statsLastUpdated")) {
            for (let d of dates) {
                d.textContent = localStorage.getItem("statsLastUpdated");
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

    nameChange(){
        let name;
        let namePrompt = prompt("Please enter your new name:", "Enter New Name");

        if (namePrompt === null || namePrompt === "" || namePrompt === "Enter New Name"){
            window.alert("Name not changed");
        } else {
            name = namePrompt;
            localStorage.setItem("userName", name);
            location.reload();
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

    changeProfileimg(input,btn,preview){
            let reader;

            if (input.files && input.files[0]) {
                reader = new FileReader();
                reader.onload = function(e){
                    preview.setAttribute('src',e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
    }

    refreshLocation(){
        const promptBox = confirm("Would you like to refresh your location?");
        if (promptBox === true) {
            location.reload();
            alert("Location refreshed");
        } else{
            alert("Cancelled Refresh");
        }
    }

    save() {
        let themeBox = document.getElementById("theme-btn");
        localStorage.setItem("theme-btn",themeBox.checked);
    }

    toggleShowElement(element){
        if (element.style.display === "none" ){
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
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
        if(num === null){
            return 0;
        }
        else{
            return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }
    }

    statUpdate(){
        getNationalData("newCasesByPublishDate").then(data => localStorage.setItem("nationalNewCases", Number(data)));
        getNationalData("newDeaths28DaysByPublishDate").then(data => localStorage.setItem("nationalNewDeaths", Number(data)));
        getNationalData("cumPeopleVaccinatedFirstDoseByPublishDate").then(data => localStorage.setItem("firstDoseVaccinated", Number(data)));
        getNationalData("cumCasesByPublishDate").then(data => localStorage.setItem("nationalTotalCases", Number(data)));
        setLocalData("Glasgow City", "newCasesByPublishDate").then(data => localStorage.setItem("userDefinedLocationNewCases", Number(data)));
        setLocalData("Glasgow City", "newDeaths28DaysByPublishDate").then(data => localStorage.setItem("userDefinedLocationNewDeaths", Number(data)));
        setLocalData("Glasgow City", "alertLevel").then(data => localStorage.setItem("userDefinedLocationAlertLevel", Number(data)));
        setLocalData("Glasgow City", "cumCasesByPublishDate").then(data => localStorage.setItem("userDefinedTotalCases", Number(data)));
        setLocalData("Glasgow City", "cumDeaths28DaysByPublishDate").then(data => localStorage.setItem("userDefinedTotalDeaths", Number(data)));
        setGlobalData("newCases").then(data => localStorage.setItem("globalNewCases", Number(data)));
        setGlobalData("newDeaths").then(data => localStorage.setItem("globalNewDeaths", Number(data)));
        setGlobalData("totalDeaths").then(data => localStorage.setItem("globalTotalDeaths", Number(data)));
        setGlobalData("totalCases").then(data => localStorage.setItem("globalTotalCases", Number(data)));
        localStorage.setItem("statsLastUpdated", this.getDate());
        console.log("Stats updated!");
    }
    
} //END OF MODEL CLASS

async function getNationalData(typeOfData) {
    //await the response of the fetch call
   let response = await fetch("https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure={%22date%22:%22date%22,%22"+typeOfData+"%22:%22"+typeOfData+"%22}");
    //proceed once the first promise is resolved.
   let data = await response.json();
    //proceed only when the second promise is resolved
    if(typeOfData === "newCasesByPublishDate"){
        localStorage.setItem("nationalNewCasesYesterday", data.data[1].newCasesByPublishDate);
        return data.data[0].newCasesByPublishDate;
    }
    else if(typeOfData === "newDeaths28DaysByPublishDate"){
        localStorage.setItem("nationalNewDeathsYesterday", data.data[1].newDeaths28DaysByPublishDate);
        return data.data[0].newDeaths28DaysByPublishDate;
    }
    else if(typeOfData === "cumPeopleVaccinatedFirstDoseByPublishDate"){
        return data.data[0].cumPeopleVaccinatedFirstDoseByPublishDate;
    }
    else if(typeOfData === "cumCasesByPublishDate"){
        return data.data[0].cumCasesByPublishDate;
    }
}

async function setLocalData(location, typeOfData){
    //await the response of the fetch call
   let response = await fetch("https://api.coronavirus.data.gov.uk/v1/data?filters=areaName="+location+"&structure={%22date%22:%22date%22,%22"+typeOfData+"%22:%22"+typeOfData+"%22}");
    //proceed once the first promise is resolved.
   let data = await response.json();
    //proceed only when the second promise is resolved
    if(typeOfData === "newCasesByPublishDate"){
        localStorage.setItem("userDefinedLocationNewCasesYesterday", data.data[1].newCasesByPublishDate);
        return data.data[0].newCasesByPublishDate;
    }
    else if(typeOfData === "newDeaths28DaysByPublishDate"){
        localStorage.setItem("userDefinedLocationNewDeathsYesterday", data.data[0].newDeaths28DaysByPublishDate);
        return data.data[0].newDeaths28DaysByPublishDate;
    }
    else if(typeOfData === "alertLevel"){
        return data.data[0].alertLevel;
    }
    else if(typeOfData === "cumCasesByPublishDate"){
        return data.data[0].cumCasesByPublishDate;
    }
    else if(typeOfData === "cumDeaths28DaysByPublishDate"){
        return data.data[0].cumDeaths28DaysByPublishDate;
    }
}

async function setGlobalData(typeOfData) {
    //await the response of the fetch call
   let response = await fetch("https://corona-api.com/timeline");
    //proceed once the first promise is resolved.
   let data = await response.json();
    //proceed only when the second promise is resolved
    if(typeOfData === "newCases"){
        localStorage.setItem("globalNewCasesYesterday", data.data[1].new_confirmed);
        return data.data[0].new_confirmed;
    }
    else if(typeOfData === "newDeaths"){
        localStorage.setItem("globalNewDeathsYesterday", data.data[1].new_deaths);
        return data.data[0].new_deaths;
    }
    else if(typeOfData === "totalDeaths"){
        return data.data[0].deaths;
    }
    else if(typeOfData === "totalCases"){
        return data.data[0].confirmed;
    }
}

function getUserLocation() {
    var startPos;
    var geoSuccess = async function(position) {
        var startPos;
        startPos = position;
        //longitude and latitude
        let lat = startPos.coords.latitude;
        let long = startPos.coords.longitude;
        console.log(lat);
        console.log(long);

        //using the bigdatacloud api to convert long and lat into a city
        let response = await fetch("https://api.bigdatacloud.net/data/reverse-geocode-client?latitude="+lat+"&longitude="+long+"&localityLanguage=en");
        let data = await response.json();

        console.log(data.locality);
        console.log(data.city);
        console.log(data.principalSubdivision);
        //storing the location data for future use
        localStorage.setItem("userLocality", data.locality);
        localStorage.setItem("userCity", data.city);
        localStorage.setItem("userCountry", data.principalSubdivision);
        return data;

    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
}