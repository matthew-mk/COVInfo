'use strict';
/*global $:false, document:false, navigator:false, fetch:false, localStorage:false, console:false*/
$(document).ready(function(){
    var currentPage = {
        value: 0
    };

    var empty = false;

    $("#welcome").hide();
    $("#profile").hide();
    $("#perms").hide();
    $("#done").hide();
    $("#skip-button").hide();

    $("#welcome").fadeIn(500);

    $("#next-button").click(function() {
        increment(currentPage);
    });

    $("#location-perm").click(function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(saveLocation);
        }
    });

    $("#notification-perm").click(function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(saveLocation);
        }
    });

    var increment = function(page) {
        // TODO: Save profile info in localStorage?

        empty = $('input[type="text"]').get().every(item => item.value !== '');

        if (page.value !== 1) {
            page.value++;
        }
        else {
            if (empty === true) page.value++;
            else {
                //.filter(function() { return this.value === ''; })
                $('input[type="text"]').each(function(){
                    $(this).addClass("signup-input-error");
                });

                return;
            }
        }

        $(".carousel-circle__active").removeClass("carousel-circle__active");
        $(".carousel-circle").eq(page.value).addClass("carousel-circle__active");

        // Change page:
        if (page.value === 1) {
            $("body").removeClass("blue-theme");

            //$("#next-button").removeAttr("type").attr("type", "submit").attr("form", "signup-form")
        
            $("#welcome").fadeOut(500);
            $("#profile").delay(500).fadeIn(500);
        }
        else if (page.value === 2) {
            $("#profile").fadeOut(500);
            $("#perms").delay(500).fadeIn(500);

            $("#next-button").addClass("skip__button")
            .html("Skip <span class='material-icons-outlined' style='margin-left: 1.5vw'>clear</span>");
        }
        else if (page.value === 3) {
            $("body").addClass("blue-theme");
                    
            $("#perms").fadeOut(500);
            $("#done").delay(500).fadeIn(500);
                    
            $("#skip-button").fadeOut(500);
        
            $("#next-button")
            .removeClass("skip__button")
            .wrap("<a href='./index.html'</a>")
            .html("Done <span class='material-icons-outlined' style='margin-left: 1.5vw'>done</span>");
        }
    };

    async function saveLocation(position) {
        //window.alert(`${position.coords.latitude}, ${position.coords.longitude}`); // Debug
        var location = [{latitude: position.coords.latitude, longitude: position.coords.longitude}];

        let response = await fetch("https://api.bigdatacloud.net/data/reverse-geocode-client?latitude="+position.coords.latitude+"&longitude="+position.coords.longitude+"&localityLanguage=en");
        let data = await response.json();

        localStorage.setItem("location", JSON.stringify(location));
        
        console.log(data.locality);
        console.log(data.city);
        console.log(data.principalSubdivision);
        //storing the location data for future use
        localStorage.setItem("userLocality", data.locality);
        localStorage.setItem("userCity", data.city);
        localStorage.setItem("userCountry", data.principalSubdivision);


        $("#next-button").removeClass("skip__button")
        .html("Next <span class='material-icons-outlined' style='margin-left: 1.5vw'>arrow_forward</span>");

        /*
        location = true; notification = true;

        if (location === true && notification === true) {
            window.alert(`${position.coords.latitude}, ${position.coords.longitude}`); // Debug

            $("#next-button").removeClass("skip__button")
            .html("Next <span class='material-icons-outlined' style='margin-left: 1.5vw'>arrow_forward</span>")
        }
        */
    }
});

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