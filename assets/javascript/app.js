var starWarsGifs = ["Old Republic", "Sith Empire", "Jedi Order", "Darth Vader", "Darth Sidious", "Droids"];
var starWarsImage = "";

function showButtons() {
    $("#buttonItems").empty();
    $("#starWars-input").val("");

    for (var i = 0; i < starWarsGifs.length; i++) {
        var button = $("<button class='btn1'>");
        button.addClass("starWars");
        button.attr("starWars-name", starWarsGifs[i]);
        button.text(starWarsGifs[i]);
        $("#buttonItems").append(button);
        $("#buttonItems").append(" ");
    }
}
showButtons();

$("#addGif").on("click", function (event) {
    $("#entry").empty();
    event.preventDefault();
    var starWarsInput = $("#starWars-input").val().trim();
    var starWarsTerm = $(this).attr("starWars-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + starWarsInput + "&limit=10&api_key=mmMzF361bypvJh3Fh13bwFXULv6xG65z";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        if (response.pagination.total_count >= 10) {
            starWarsGifs.push(starWarsInput);
            showButtons();

        } else if (response.pagination.total_count === 0) {
            $("#entry").html(" You have chosen poorly young apprentice.  Please try again.");

        } else if (response.pagination.total_count === 1) {
            $("#entry").html(" You have chosen poorly young apprentice.  Please try again.");
        } else {
            $("#entry").html(" Sorry, there were only " + response.pagination.total_count + " results for this.  Please try again.");
        }
        $("#starWars-input").val("");
    });
});

$(document).on("click", ".starWars", display);
function display() {
    // This is just to clear out any error message (if there is one)
    $("#entry").empty();
    var starWarsTerm = $(this).attr("starWars-name");
    // The GIPHY query.  This limits to 10 results

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + starWarsTerm + "&limit=10&api_key=mmMzF361bypvJh3Fh13bwFXULv6xG65z";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
         
        for (var j = 0; j < response.data.length; j++) {

            
            var active = response.data[j].images.fixed_width.url;
            var still = response.data[j].images.fixed_width_still.url;
            var rating = "Rating: " + (response.data[j].rating).toUpperCase();
            var starWarsImage = $("<img>");
            
            $("#ratings").css("color", "yellow");

            
            var ratingDiv = $("<div id='ratingDiv'>" + rating + "</div>");
            $(starWarsImage).attr({ "active": active, "still": still, "src": still, "state": "still" });

         
            var ratingAndImage = $("<div id='ratingAndImage'>");
            $(ratingAndImage).prepend(ratingDiv, starWarsImage);

            $("#ratings").prepend(ratingAndImage);

            $(starWarsImage).on("click", function (event) {

                $("#entry").empty();

                var state = $(this).attr("state");
                var source = $(this).attr("src");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("active"));
                    $(this).attr("state", "active");

                } else {
                    $(this).attr("src", $(this).attr("still"));
                    $(this).attr("state", "still");
                }
            });
        }
    });
}


