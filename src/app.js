$(document).ready(function(){
    let counter = 1;


    $("#stats-header").hide();
    $("#tabs-header").hide();

    $("#stats-main").hide();
    $("#news-main").hide();

    $("#profile-link").click(function() {
        if (counter !== 1) {
            counter = 1;
            
            $("#stats-main").fadeOut(300);
            $("#news-main").fadeOut(300);
            $("#profile-main").fadeIn(300);

            $("#stats-header").fadeOut(300);
            $("#tabs-header").fadeOut(300);
            $("#profile-header").delay(300).fadeIn(300);

            $("#profile-link").append("<p class='accent__color'>For you</p>");
            $("#profile-link span").addClass("accent__color");

            $("#stats-link").children().not("span").remove()
            $("#stats-link span").removeClass("accent__color");

            $("#news-link").children().not("span").remove()
            $("#news-link span").removeClass("accent__color");
        }
    });

    $("#stats-link").click(function() {
        if (counter !== 2) {
            counter = 2;
            
            $("#profile-main").fadeOut(300);
            $("#news-main").fadeOut(300);
            $("#stats-main").fadeIn(300);
            $("#nationwide-stats").hide()

            $("#profile-header").fadeOut(300);
            $("#stats-header").delay(300).fadeIn(300);
            $("#tabs-header").fadeIn(300);
            $("#nationwide-tab").trigger("click");

            $("#stats-link").append("<p class='accent__color'>Statistics</p>");
            $("#stats-link span").addClass("accent__color");

            $("#profile-link").children().not("span").remove()
            $("#profile-link span").removeClass("accent__color");

            $("#news-link").children().not("span").remove()
            $("#news-link span").removeClass("accent__color");
        }
    });

    $("#news-link").click(function() {
        if (counter !== 3) {
            counter = 3;

            $("#profile-main").fadeOut(300);
            $("#stats-main").fadeOut(300);
            $("#news-main").fadeIn(300);
            $("#nationwide-news").hide()

            $("#profile-header").fadeOut(300);
            $("#stats-header").fadeOut(300);
            $("#tabs-header").delay(300).fadeIn(300);
            $("#nationwide-tab").trigger("click");

            $("#news-link").append("<p class='accent__color'>News</p>");
            $("#news-link span").addClass("accent__color");

            $("#profile-link").children().not("span").remove()
            $("#profile-link span").removeClass("accent__color");

            $("#stats-link").children().not("span").remove()
            $("#stats-link span").removeClass("accent__color");
        }
    });

    $("#nationwide-tab").click(function() {
        $("#worldwide-tab").removeClass("selected-tab");
        $("#nationwide-tab").addClass("selected-tab");

        if (counter === 2) {
            $("#worldwide-stats").fadeOut(300);
            $("#nationwide-stats").delay(300).fadeIn(300);
        }
        else {
            $("#worldwide-news").fadeOut(300);
            $("#nationwide-news").delay(300).fadeIn(300);
        }
    });

    $("#worldwide-tab").click(function() {
        $("#nationwide-tab").removeClass("selected-tab");
        $("#worldwide-tab").addClass("selected-tab");

        if (counter === 2) {
            $("#nationwide-stats").fadeOut(300);
            $("#worldwide-stats").delay(300).fadeIn(300);
        }
        else {
            $("#nationwide-news").fadeOut(300);
            $("#worldwide-news").delay(300).fadeIn(300);
        }
    });
});