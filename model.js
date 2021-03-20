/*jshint globalstrict: true*/
/*global localStorage: false, console: false, $: false, document:false, location:false, confirm:false, alert:false, fetch:false, navigator:false*/
/*jshint esversion: 8 */

'use strict';

class Model{
    constructor() {

    }

    displayDates(dates) {
        if (localStorage.getItem("statsLastUpdated")) {
            for (let d of dates) {
                d.textContent = localStorage.getItem("statsLastUpdated");
            }
        }
    }

    showDiv(element) {
        element.style.display = "flex";
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

    saveName(input){
       let confirmation = confirm("Would you like to save your name?");
       if (input.value === null || input.value === "") {
           alert("Empty Value, Please enter your new name");
           location.reload();
       } else if (confirmation === true){
           localStorage.setItem("userName",input.value);
       }
    }

    saveSignupinfo(fName,lName,image){
        localStorage.setItem("userName", fName.value + " " + lName.value);
        localStorage.setItem("profileImg", image.value);
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

    imageChange(selectOption, preview){
        const selected = selectOption.value;

        if (selected === "grey"){
            preview.src = "res/graphics/default-profile.png";
            localStorage.setItem("profileImg","grey");
        } else if (selected === "blue"){
            preview.src = "res/graphics/blue-profile.png";
            localStorage.setItem("profileImg","blue");
        }  else if (selected === "green"){
            preview.src = "res/graphics/mind-profile.png";
            localStorage.setItem("profileImg","green");
        } else if (selected === "orange"){
            preview.src = "res/graphics/orange-profile.png";
            localStorage.setItem("profileImg","orange");
        } else if (selected === "purple"){
            preview.src = "res/graphics/purple-profile.png";
            localStorage.setItem("profileImg","purple");
        } else if (selected === "red"){
            preview.src = "res/graphics/red-profile.png";
            localStorage.setItem("profileImg","red");
        }
    }

    getProfilePicture(selectOption,preview){
        const savedIMG = localStorage.getItem("profileImg");
        if (savedIMG === "grey"){
            preview.src = "res/graphics/default-profile.png";
            selectOption.value = "grey";
        } else if (savedIMG === "blue"){
            preview.src = "res/graphics/blue-profile.png";
            selectOption.value = "blue";
        }  else if (savedIMG === "green"){
            preview.src = "res/graphics/mind-profile.png";
            selectOption.value = "green";
        } else if (savedIMG === "orange"){
            preview.src = "res/graphics/orange-profile.png";
            selectOption.value = "orange";
        } else if (savedIMG === "purple"){
            preview.src = "res/graphics/purple-profile.png";
            selectOption.value = "purple";
        } else if (savedIMG === "red"){
            preview.src = "res/graphics/red-profile.png";
            selectOption.value = "red";
        }
    }

    getProfileOnly(preview){
        const savedIMG = localStorage.getItem("profileImg");
        if (savedIMG === "grey"){
            preview.src = "res/graphics/default-profile.png";
        } else if (savedIMG === "blue"){
            preview.src = "res/graphics/blue-profile.png";
        }  else if (savedIMG === "green"){
            preview.src = "res/graphics/mind-profile.png";
        } else if (savedIMG === "orange"){
            preview.src = "res/graphics/orange-profile.png";
        } else if (savedIMG === "purple"){
            preview.src = "res/graphics/purple-profile.png";
        } else if (savedIMG === "red"){
            preview.src = "res/graphics/red-profile.png";
        }
    }

    refreshLocation(){
        const promptBox = confirm("Would you like to refresh your location?");
        if (promptBox === true) {
            location.reload();
            alert("Location refreshed");
        }
    }

    toggleShowElement(element){
        if (element.style.display === "none" ){
            element.previousElementSibling.style.display = "flex";
            element.style.display = "flex";
        } else {
            element.previousElementSibling.style.display = "none";
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

    getHour() {
        let date = new Date();
        console.log(date.getHours());
        return date.getHours();
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
        setLocalData(localStorage.getItem("userLocality"), "newCasesByPublishDate").then(data => localStorage.setItem("userDefinedLocationNewCases", Number(data)));
        setLocalData(localStorage.getItem("userLocality"), "newDeaths28DaysByPublishDate").then(data => localStorage.setItem("userDefinedLocationNewDeaths", Number(data)));
        setLocalData(localStorage.getItem("userLocality"), "alertLevel").then(data => localStorage.setItem("userDefinedLocationAlertLevel", Number(data)));
        setLocalData(localStorage.getItem("userLocality"), "cumCasesByPublishDate").then(data => localStorage.setItem("userDefinedTotalCases", Number(data)));
        setLocalData(localStorage.getItem("userLocality"), "cumDeaths28DaysByPublishDate").then(data => localStorage.setItem("userDefinedTotalDeaths", Number(data)));
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
    if(location === "Glasgow"){ //api doesnt recognise glasgow only glasgow city
        location = "Glasgow City";
    }
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