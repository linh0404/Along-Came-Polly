var params = new URLSearchParams();
params.append("client_id", "");
params.append("redirect_uri", "http://localhost:8080/");
params.append("show_dialog", true);

console.log(params.toString());

// GET https://accounts.spotify.com/authorize?client_id=8eb9c5f7f3b048bc9184193d33afdc96&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F
// client_id=&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F

// next step - anchor token

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
