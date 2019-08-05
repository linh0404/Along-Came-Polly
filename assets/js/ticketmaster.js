// function to call and display events from Ticketmaster
function eventFromTicketMaster(artist) {
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
    console.log(response);

    // to access an array of object using square brackets
    var result = response["_embedded"]["events"];

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
  });
}

$("#findEvent").on("click", function(event) {
  event.preventDefault();

  // grab the user search input from textbox
  var grabSearchInput = $("#artistSearchInput")
    .val()
    .trim();

  // add the input from the text box to the array
  eventFromTicketMaster(grabSearchInput);
});
