'use strict';

class Model{
    constructor() {
        this.scotlandNewCases = this.setNewGlasgowCases();
        this.nationalNewCases = this.setNationalData("newCasesByPublishDate");
        this.nationalNewDeaths = this.setNationalData("newDeaths28DaysByPublishDate");
        this.firstDoseVaccinated = this.setNationalData("cumPeopleVaccinatedFirstDoseByPublishDate");
    }


    // updates the number of new cases in scotland
    setNewGlasgowCases() {
    let returnData; // data to be returned
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "https://api.coronavirus.data.gov.uk/v1/data?filters=areaName=Glasgow City&structure={%22date%22:%22date%22,%22newCases%22:%22newCasesByPublishDate%22}",
        async: false, //MUST BE ASYNC FALSE
        success: function(data){
            returnData = data.data[0].newCases;
        }
    });
    this.scotlandNewCases = returnData; //update the models data
    return returnData;
    };

    //getter to return the new cases in scotland. Called by the controller.
    getNewGlasgowCases(){
        return this.scotlandNewCases;
    }



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
        if(typeOfData == "newCasesByPublishDate"){
            this.nationalNewCases = returnData;
        }
        else if(typeOfData == "newCasesByPublishDate"){
            this.nationalNewDeaths = returnData;
        }
        else if(typeOfData == "cumPeopleVaccinatedFirstDoseByPublishDate"){
            this.firstDoseVaccinated = returnData;
        }
        return returnData;
    };

    getNationalNewCases(){
        return this.nationalNewCases;
    }

    getNationalNewDeaths(){
        return this.nationalNewDeaths;
    }

    getFirstDoseVaccinated(){
        return this.firstDoseVaccinated;
    }
    
    //https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure={%22date%22:%22date%22,%22newCases%22:%22newDeaths28DaysByPublishDate%22}
    
      
}


