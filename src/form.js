'use strict';
/*global $:false, document:false*/
$(document).ready(function() {
    $("#symptoms-form").show();
    $("#form-action-buttons").show();
    $("#symptoms-results").hide();
    $("#symptoms-details").hide();


    $("#submit-button").click(function() {
        if (canSubmit()) {
            $("#symptoms-form").fadeOut(300);
            $("#form-action-buttons").fadeOut(300);

            if (getSymptoms() === true) {
                $("#symptoms-results-title").html("Your answers suggest you <span class='opposite__color'> may be at risk </span> of having the coronavirus infection.");
                
                $("#symptoms-details").removeClass("accent__color accent__box").addClass("opposite__color opposite__box");
                $("#symptoms-details-title").html("Call NHS 111");
                $("#symptoms-details-description").html("Please phone 111 now and tell them that:");
                $("#symptoms-details-poimt").html("Your answers suggest that you might be at risk of having the coronavirus, because you have 1 or more the the coronavirus symptoms.");
            }   
            else {
                $("#symptoms-results-title").html("Your answers <span class='accent__color'> do not </span> suggest you have the coronavirus infection.");

                $("#symptoms-details").removeClass("opposite__color opposite__box").addClass("accent__color accent__box");
                $("#symptoms-details-title").html("Consider calling NHS 111");
                $("#symptoms-details-description").html("If you are unwell, consider calling NHS 111 and tell them that:");
                $("#symptoms-details-poimt").html("Your answers do not suggest you might be at risk of having coronavirus, but you are still feeling unwell.");
            }     

            $("#symptoms-results").delay(350).fadeIn(300);
            $("#symptoms-details").delay(350).fadeIn(300);
        }
        else {
            $('input[type="checkbox"]').each(function(){
                $(this).addClass("checkbox-input-error");
            });
        }
    });

    $("#clear-button").click(function() {
        $("#highTemperature").prop( "checked", false);
        $("#cough").prop( "checked", false);
        $("#lossOfSmell").prop( "checked", false);
        $("#shortnessOfBreath").prop( "checked", false);
        $("#noneOfTheAbove").prop( "checked", false);
    });

    $("#noneOfTheAbove").click(function() {
        $("#highTemperature").prop( "checked", false);
        $("#cough").prop( "checked", false);
        $("#lossOfSmell").prop( "checked", false);
        $("#shortnessOfBreath").prop( "checked", false);
    });

    $("#highTemperature").click(function() {
        $("#noneOfTheAbove").prop( "checked", false);
    });

    $("#cough").click(function() {
        $("#noneOfTheAbove").prop( "checked", false);
    });

    $("#lossOfSmell").click(function() {
        $("#noneOfTheAbove").prop( "checked", false);
    });

    $("#shortnessOfBreath").click(function() {
        $("#noneOfTheAbove").prop( "checked", false);
    });

    function canSubmit() {
        return $("#highTemperature").is(":checked") || $("#cough").is(":checked") || $("#lossOfSmell").is(":checked") || $("#shortnessOfBreath").is(":checked") || $("#noneOfTheAbove").is(":checked");
    }

     function getSymptoms() {
        return $("#highTemperature").is(":checked") || $("#cough").is(":checked") || $("#lossOfSmell").is(":checked") || $("#shortnessOfBreath").is(":checked")
    }
});