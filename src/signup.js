$(document).ready(function(){
    var currentPage = {
        value: 0
    }

    var empty = false;
    var location = false;
    var notification = false;

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

        $(".carrousel-circle__active").removeClass("carrousel-circle__active");
        $(".carrousel-circle").eq(page.value).addClass("carrousel-circle__active");

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
            .html("Skip <span class='material-icons-outlined' style='margin-left: 1.5vw'>clear</span>")
        }
        else if (page.value === 3) {
            $("body").addClass("blue-theme");
                    
            $("#perms").fadeOut(500);
            $("#done").delay(500).fadeIn(500);
                    
            $("#skip-button").fadeOut(500);
        
            $("#next-button")
            .removeClass("skip__button")
            .wrap("<a href='./index.html'</a>")
            .html("Done <span class='material-icons-outlined' style='margin-left: 1.5vw'>done</span>")
        }
    }

    function saveLocation(position) {
        //window.alert(`${position.coords.latitude}, ${position.coords.longitude}`); // Debug
        var location = [{latitude: position.coords.latitude, longitude: position.coords.longitude}];

        localStorage.setItem("location", JSON.stringify(location));

        $("#next-button").removeClass("skip__button")
        .html("Next <span class='material-icons-outlined' style='margin-left: 1.5vw'>arrow_forward</span>")

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