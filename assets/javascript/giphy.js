// Initial array of NBA Players
var nba = ["LeBron James", "Kobe Bryant", "Allen Iverson", "Stephen Curry",
    "Kevin Durant", "Kyrie Irving", "Giannis Antetokounmpo", "Joel Embiid",
    "Ben Simmons", "Bradley Beal", "Karl Anthony Towns", "Kawhi Leonard",
    "Paul George", "James Harden", "Russell Westbrook", "Damian Lillard"
];

$("#buttons-view").empty();


// displayMovieInfo function re-renders the HTML to display the appropriate content
function getPlayerInfo() {

    var player = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        player + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data;
        $("#player-images").empty();

        for (var i = 0; i < results.length; i++) {
            var playerDiv = $("<div>");
            playerDiv.addClass("player-img");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating.toUpperCase());

            var playerImage = $("<img>");
            playerImage.attr("id", "image");
            playerImage.attr("src", results[i].images.fixed_width_still.url);
            playerImage.attr("data-still", results[i].images.fixed_width_still.url);
            playerImage.attr("data-animate", results[i].images.fixed_width.url);
            playerImage.attr("data-state", "still");
            playerImage.attr("width", "350px");
            playerImage.attr("height", "200px");

            playerDiv.prepend(p);
            playerDiv.append(playerImage);

            $("#player-images").prepend(playerDiv);

        };
    });

}


$(document).on("click", "#image", function () {

    var state = $(this).attr("data-state");

    if (state === 'animate') {
        var still = $(this).attr("data-still");
        $(this).attr("src", still);
        $(this).attr("data-state", "still");

    }

    if (state === 'still') {
        var animate = $(this).attr("data-animate");
        $(this).attr("src", animate);
        $(this).attr("data-state", "animate");

    }

});

function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < nba.length; i++) {
        var a = $("<button>");
        a.addClass("nba-player");
        a.addClass("btn btn-primary");
        a.attr("data-name", nba[i]);
        a.text(nba[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-player").on("click", function (event) {
    event.preventDefault();
    var newPlayer = $("#player-input").val().trim();
    $("#player-input").val("");
    nba.push(newPlayer);

    renderButtons();
});



$(document).on("click", ".nba-player", getPlayerInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();