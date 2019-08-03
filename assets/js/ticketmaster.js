// function to call and display events from Ticketmaster
function eventFromTicketMaster() {
  var eventInfo = $(this).attr("data-event");

  //queryURL is the url we'll use to query the API
  var queryURL =
    "https://app.ticketmaster.com/discovery/v2/events.json?apikey=COsXEH07ztMABw0SgNFNxALf8IefVSt3&countryCode=au&keyword=" +
    eventInfo;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(URL);
    console.log(response);
  });
}
eventFromTicketMaster();
