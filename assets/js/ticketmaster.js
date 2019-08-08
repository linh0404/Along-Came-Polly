// function to call and display events from Ticketmaster
var ticket = [];

$("#getArtists").on("click", function(e) {
  console.log(topArtists);
  for (var j = 0; j < 5; j++) {
    var showArtistEvent = topArtists[j]["name"];
    console.log("artist", showArtistEvent);
    eventFromTicketMaster(showArtistEvent, false);
  }
});

function eventFromTicketMaster(artist, searchEvent) {
  //queryURL is the url we'll use to query the API
  var queryURL =
    "https://app.ticketmaster.com/discovery/v2/events.json?apikey=COsXEH07ztMABw0SgNFNxALf8IefVSt3&countryCode=AU&limit=4&keyword=" +
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
      for (var i = 0; i < 5 || i < result.lengt; i++) {
        var divStoreSearchResult = $("<div>");

        // display artist name and concert of the artist by calling the api

        var name = $("<h3 class='fa fa-heart heart fa-2x'>");

        name.text(result[i]["name"]);
        console.log("name", name);

        var image = $("<image class='artist-image'>");
        image.attr("src", result[i]["images"][0]["url"]);

        var eventUrl = $("<a>");
        eventUrl.attr("href", result[i].url);

        divStoreSearchResult.append(name);
        eventUrl.append(image);
        divStoreSearchResult.append(eventUrl);

        $("#showArtistEvent").append(divStoreSearchResult);
      }
      // store all the artist info result in div with an id name displaySearchResult
    } else {
      if (result && result.length) {
        // console.log("result", result[0]);
        // console.log("image", result[0].images[0].url);
        // console.log("url", result[0].url);
        for (var k = 0; k < 5 || k < result.length; k++) {
          var newdiv = $("<div>");
          newdiv.attr("class", "col-xl-2 col-lg-3 col-md-4 col-sm-12");
          // store the event/artist name from api call in a variable
          console.log("newdiv", newdiv);


          var displayname = $("<h3 class='fa fa-heart heart fa-2x'>");

          displayname.text(result[k].name);
          console.log("name", displayname);

          // // store the image from api reponse in a variable imageURL
          var displayimage = $("<img id='event-image'>");
          displayimage.attr("src", result[k].images[0].url);
          console.log(displayimage);

          var displayurl = $("<a>");
          displayurl.attr("href", result[k].url);
          console.log("url", displayurl);


          // Create favourites
          var favourites = $(".fa fa-heart heart fa-2x");
          favourites.attr("aria-hidden", "true");
          favourites.attr("span-image");

          newdiv.append(favourites);
          displayurl.append(displayimage);
          newdiv.append(displayname);
          newdiv.append(displayurl);

          $("#showArtistEvent").append(newdiv);
        }
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