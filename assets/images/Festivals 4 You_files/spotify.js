var topArtists = [];

function getArtists() {
  const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function(initial, item) {
      if (item) {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
  window.location.hash = "";

  // Set token
  let _token = hash.access_token;

  // If there is no token, redirect to Spotify authorization
  if (_token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/artists",
      type: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + _token);
        console.log("request sent to the server");
      },
      success: function(data) {
        // Do something with the returned data
        topArtists = data.items;

        data.items.map(function(artist) {
          let topArtists = "<h4>Here are your top artists on Spotify:</h4><br>";
          let item = $("<li>" + artist.name + "</li>");
          item.appendTo($("#top-artists"));
        });
      }
    });
    // Make a call using the token

    $.ajax({
      url: "https://api.spotify.com/v1/me/top/tracks",
      type: "GET",
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + _token);
      },
      success: function(data) {
        // Do something with the returned data
        data.items.map(function(artist) {
          let topTracks = "<h4>Here are your top tracks on Spotify</h4><br>";
          let item = $("<li>" + artist.name + "</li>");
          item.appendTo($("#top-tracks"));
        });
      }
    });
  }
}
// document onload or ready
$(document).ready(function(e) {
  getArtists();
});

$("#spotify").on("click", function(e) {
  e.preventDefault();

  const authEndpoint = "https://accounts.spotify.com/authorize";

  // Replace with your app's client ID, redirect URI and desired scopes
  const clientId = "8eb9c5f7f3b048bc9184193d33afdc96";
  const redirectUri = "http://localhost:8080";
  const scopes = ["user-top-read", "user-read-recently-played"];

  window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token&show_dialog=true`;
});
