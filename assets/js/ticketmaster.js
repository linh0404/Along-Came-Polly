// function to call and display events from Ticketmaster
var ticket = [];

$("#getArtists").on("click", function(e) {
  console.log(topArtists);
  for (var j = 0; j < 3; j++) {
    var showArtistEvent = topArtists[j]["name"];
    console.log("artist", showArtistEvent);
    eventFromTicketMaster(showArtistEvent, false);
  }
});

function eventFromTicketMaster(artist, searchEvent) {
  //queryURL is the url we'll use to query the API
  var queryURL =
    "https://app.ticketmaster.com/discovery/v2/events.json?apikey=COsXEH07ztMABw0SgNFNxALf8IefVSt3&dmaId=705&limit=4&keyword=" +
    artist;
  $.ajax({
    url: queryURL,
    method: "GET",
    async: true,
    crossDomain: true,
    dataType: "json"
  }).then(function(response) {
    var result = response["_embedded"]["events"];
    console.log("result", result);
    showArtistEvent = response["_embedded"]["events"]["name"];

    if (searchEvent) {
      // looping through the result
      for (var i = 0; i < 5; i++) {
        // display artist name and concert of the artist by calling the api

        var divStoreSearchResult = $("<div>");

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
        var newdiv = $("<div>");
        newdiv.attr("class", "col-xl-2 col-lg-3 col-md-4 col-sm-12");
        // console.log("result", result[0]);
        // console.log("image", result[0].images[0].url);
        // console.log("url", result[0].url);

        // store the event/artist name from api call in a variable
        console.log("newdiv", newdiv);
        var displayname = $("<h3>");
        displayname.text(result[0].name);
        console.log("name", displayname);

        // // store the image from api reponse in a variable imageURL
        var displayimage = $("<img id='event-image'>");
        displayimage.attr("src", result[0].images[0].url);
        console.log(displayimage);

        var displayurl = $("<a>");
        displayurl.attr("href", result[0].url);
        console.log("url", displayurl);

        displayurl.append(displayimage);
        newdiv.append(displayname);
        newdiv.append(displayurl);

        $("#showArtistEvent").append(newdiv);
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
