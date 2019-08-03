// function to call and display events from Ticketmaster
function eventFromTicketMaster() {
  // var artist = $(this).attr("data-event");

  //queryURL is the url we'll use to query the API
  var queryURL =
    "https://app.ticketmaster.com/discovery/v2/events.json?apikey=COsXEH07ztMABw0SgNFNxALf8IefVSt3&countryCode=au&keyword=" +
    artist;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(URL);
    console.log(response);
  });
}

$("#findEvent").on("click", function(event) {
  event.preventDefault();

  // grab the user search input from textbox
  var grabSearchInput = $("#searchEvent")
    .val()
    .trim();

  // add the input from the text box to the array
  eventFromTicketMaster(grabSearchInput);
});
