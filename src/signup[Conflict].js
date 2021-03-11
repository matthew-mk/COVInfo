$(document).ready(function(){

    

    var currentPage = 0

    $(".next-button").click(function() {
        currentPage++;

        // Change page:
        if (currentPage === 1) {
            $("body").removeClass("blue-theme")

            $("#welcome").fadeOut(500)
            $("#profile").fadeIn(500)
        } 
    });
});