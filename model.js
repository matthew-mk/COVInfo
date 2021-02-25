'use strict';

class Model{
    constructor() {
        this.scotlandNewCases = this.setNewGlasgowCases();
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

      
}


