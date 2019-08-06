// function to call and display events from Ticketmaster

$("#getArtists").on("click", function(e) {
  console.log(topArtists);
  for (var j = 0; j < topArtists.length; j++) {
    // console.log(topArtists[j]["name"]);
    // $("#showArtistEvent").append(showArtistEvent);
    var showArtistEvent = topArtists[j]["name"];
    console.log(showArtistEvent);
    eventFromTicketMaster(showArtistEvent, false);
  }
});

function eventFromTicketMaster(artist, searchEvent) {
  // var artist = $(this).attr("data-event");

  //queryURL is the url we'll use to query the API
  var queryURL =
    "https://app.ticketmaster.com/discovery/v2/events.json?apikey=COsXEH07ztMABw0SgNFNxALf8IefVSt3&countryCode=au&keyword=" +
    artist;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // console.log(url);
    console.log(26, response);
    // to access an array of object using square brackets
    var result = response["_embedded"]["events"];
    showArtistEvent = response["_embedded"]["events"];

    if (searchEvent) {
      // looping through the result
      for (var i = 0; i < result.length; i++) {
        // display artist name and concert of the artist by calling the api
        var name = $("<h3 id='artist-name'>").text(result[i]["name"]);

        var image = $("<image class='artist-image'>").attr(
          "src",
          result[i]["images"][0]["url"]
        );
      }
      // store all the artist info result in div with an id name displaySearchResult
      $("#displaySearchResult").append(name, image);
      console.log(444);
    } else {
      for (var k = 0; k < result.length; k++) {
        var populateEvents = reponse["_embedded"]["events"]["name"];
        populateEvents = $("<h4 id='artist-events-tm>");
        console.log(48, populateEvents);
        $("#showArtistEvent").append(populateEvents);
      }
    }
  });
}

$("#findEvent").on("click", function(event) {
  event.preventDefault();

  // grab the user search input from textbox
  var grabSearchInput = $("#artistSearchInput")
    .val()
    .trim();

  // add the input from the text box to the array
  eventFromTicketMaster(grabSearchInput, true);
});
