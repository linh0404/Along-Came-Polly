// function to call and display events from Ticketmaster
var ticket = [];

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
    //console.log(26, response);
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
      console.log("should run every time....");
      if (result && result.length) {
        console.log(result[0]);
        console.log(result[0].images[0].url);
        console.log(result[0].url);
        var imageURL = result[0].images[0].url;
        var url = result[0].url;
        var tile = $("<h4>");
        tile.text(url);
        // create a image link rather than seperate link and image
        var link = $("<a>");
        link.attr("href",url);
        var image = $("<img>");
        image.attr("src", imageURL);
        $("#showArtistEvent").append(tile);
        $("#showArtistEvent").append(image);
        $("#showArtistEvent").append(link.attr("href",url).image);

        // <a href=“link”><img src=“image link”></img></a>


        // for (var k = 0; k < result.length; k++) {
        //   console.log(52, ...result);
        //   ticket.push(...result);
        //   console.log("ticketsss", ticket);

        //   var populateEvents = reponse["images"][0];
        //   p = $("<h4>");
        //   p.text("hello world");
        //   image = $("<img>");
        //   image.attr("src", ["images"][url]);

        //   $("#showArtistEvent").append(image);
        // }
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
