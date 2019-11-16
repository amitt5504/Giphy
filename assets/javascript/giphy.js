// Initial array of NBA Players
var nba = ["LeBron James", "Kobe Bryant", "Allen Iverson", "Stephen Curry",
    "Kevin Durant", "Kyrie Irving", "Giannis Antetokounmpo", "Joel Embiid",
    "Ben Simmons", "Bradley Beal", "Karl Anthony Towns", "Kawhi Leonard",
    "Paul George", "James Harden", "Russell Westbrook", "Damian Lillard"
];

//clears the buttons div on page load
$("#buttons-view").empty();


// getPlayerInfo function re-renders the HTML to display the appropriate content
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

            //Image div is created with the urls of the still and animated gifs
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

//On click for each gif. Grabs the state and changes to animated if still and vice versa
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

//Function that creates the buttons for each of the NBA players
function createButtons() {
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

//on click function that updates the buttons when a new player is added
$("#add-player").on("click", function (event) {
    event.preventDefault();
    var newPlayer = $("#player-input").val().trim();
    $("#player-input").val("");
    nba.push(newPlayer);

    createButtons();
});


//on click that begins calls the getPlayerInfo function when a player button is pushed
$(document).on("click", ".nba-player", getPlayerInfo);

//function call creates the buttons on page load
createButtons();