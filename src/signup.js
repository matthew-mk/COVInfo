$(document).ready(function(){
    var currentPage = {
        value: 0
    }

    $("#welcome").hide();
    $("#profile").hide();
    $("#perms").hide();
    $("#done").hide();
    $("#skip-button").hide();

    $("#welcome").fadeIn(500);

    $(".skip-button").click(function() {
        increment(currentPage);
    });

    $(".next-button").click(function() {
        increment(currentPage);
    });

    var increment = function(page) {
        page.value++;

        // Change page:
        if (page.value === 1) {
            $("body").removeClass("blue-theme");
        
            $("#welcome").fadeOut(500);
            $("#profile").delay(500).fadeIn(500);
        }
        else if (page.value === 2) {
            $("#profile").fadeOut(500);
            $("#perms").delay(500).fadeIn(500);
                    
            $("#skip-button").fadeIn(500);
        }
        else if (page.value === 3) {
            $("body").addClass("blue-theme");
                    
            $("#perms").fadeOut(500);
            $("#done").delay(500).fadeIn(500);
                    
            $("#skip-button").fadeOut(500);
        
            $("#next-button")
            .wrap("<a href='./index.html'</a>")
            .html("Done <span class='material-icons-outlined' style='margin-left: 1.5vw'>done</span>")
        }

        /*
        $( window ).unload(function() { 
            $("body").removeClass("blue-theme");

            $("#done").fadeIn(500);
                    
            $("#skip-button").fadeOut(500);
            $("#next-button").fadeOut(500);
        });
        */
    }
});