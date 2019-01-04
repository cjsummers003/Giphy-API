// This is the initial array.
var starWarsGifs = ["Old Republic", "Sith Empire", "Jedi Order", "Darth Vader", "Darth Sidious", "Droids"];
var starWarsImage = "";

// This function shows all the buttons in the array.
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

// This runs when the user clicks "submit", it adds it to the button array and updates the buttons.

$("#addGif").on("click", function (event) {
    $("#entry").empty();
    event.preventDefault();
    var starWarsInput = $("#starWars-input").val().trim();
    var starWarsTerm = $(this).attr("starWars-name");

    // Test area to make sure the user's button has at least 10 gifs for it.
    // If there aren't 10, an error message will be shown and no button will be created.
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
            // This runs 10 times (limit is 10 in query) to show all the GIPhy pictures from the website's response.
            for (var j = 0; j < response.data.length; j++) {

                // Gets the animated gif URL
                var active = response.data[j].images.fixed_width.url;

                // Gets the still gif URL
                var still = response.data[j].images.fixed_width_still.url;
                var rating = "Rating: " + (response.data[j].rating).toUpperCase();

                // Creates the new img item
                var starWars = $("<img>");

                // This changes the text color of ratings to yellow so it can be seen against the starWars background image.
                $("#ratings").css("color", "yellow");

                // This creates a new div for the rating so that it maintains the gifs size
                var ratingDiv = $("<div id='ratingDiv'>" + rating + "</div>");
                $(ratingDiv).css({ "text-align": "center", "font-size": "20px", "width": "200", "display": "block" });
                $(starWars).attr({ "active": active, "still": still, "src": still, "state": "still" });

                // This holds the new div for both rating and the image. Every image will have a rating on top of it.
                var ratingAndImage = $("<div>");
                $(ratingAndImage).css({ "float": "left" });
                $(ratingAndImage).prepend(ratingDiv);

                // This adds the rating and image to the page.
                $("#ratings").prepend(ratingAndImage);


                // // When the user clicks on a picture, this will either start or stop the animation of that picture.
                $(starWars).on("click", function (event) {

                    // This is just to clear out any error message (if there is one)
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


