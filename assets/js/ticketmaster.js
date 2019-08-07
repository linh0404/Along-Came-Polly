// function to call and display events from Ticketmaster

var ticket = [];

$("#getArtists").on("click", function(e) {
  console.log(topArtists);
  for (var j = 0; j < topArtists.length; j++) {
    var showArtistEvent = topArtists[j]["name"];
    console.log(showArtistEvent);
    eventFromTicketMaster(showArtistEvent, false);
  }
});

function eventFromTicketMaster(artist, searchEvent) {
  //queryURL is the url we'll use to query the API
  var queryURL =
    "https://app.ticketmaster.com/discovery/v2/events.json?apikey=COsXEH07ztMABw0SgNFNxALf8IefVSt3&countryCode=au&keyword=" +
    artist;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var result = response["_embedded"]["events"];
    console.log(result);
    showArtistEvent = response["_embedded"]["events"]["name"];
    // console.log("showArtist", showArtistEvent);
    // console.log("showartistevent", response["_embedded"]["events"][0], url);

    if (searchEvent) {
      // looping through the result
      for (var i = 0; i < result.length; i++) {
        // display artist name and concert of the artist by calling the api
        var name = $("<h3 id='artist-name'>").text(result[i]["name"]);

        var image = $("<image class='artist-image'>").attr(
          "src",
          result[i]["images"][0]["url"]
        );

        var eventUrl = $("<h4>").text(result[0].url);
      }
      // store all the artist info result in div with an id name displaySearchResult
      $("#displaySearchResult").append(name, image, eventUrl);
    } else {
      if (result && result.length) {
        // console.log("result", result[0]);
        // console.log(result[0].images[0].url);
        // console.log(result[0].url);

        // store the event/artist name from api call in a variable
        var nameOfEventOrArtist = result[0].name;

        // display event/artist name in a h4 tag
        var displayEvent0rAristName = $("<h3>");
        displayEvent0rAristName.text(nameOfEventOrArtist);

        // store the image from api reponse in a variable imageURL
        var imageURL = result[0].images[0].url;

        // store the event image in a variable and reference to HTML img tag
        var image = $("<img id='event-image'>");
        image.attr("src", imageURL);

        // store the event URL response from api in a variable named url
        var url = result[0].url;
        var clickableEventURL = $("<h4>");
        clickableEventURL.text(url);
        console.log("event-url", url);

        // append the eventURL, image and name of event/arist to a div with an id showArtistEvent
        $("#showArtistEvent").append(displayEvent0rAristName);
        $("#showArtistEvent").append(image);
        $("#showArtistEvent").append(clickableEventURL);
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
