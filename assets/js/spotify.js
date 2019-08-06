$("#spotify").on("click", function(e) {
  e.preventDefault()

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

  const authEndpoint = "https://accounts.spotify.com/authorize";

  // Replace with your app's client ID, redirect URI and desired scopes
  const clientId = "8eb9c5f7f3b048bc9184193d33afdc96";
  const redirectUri = "http://localhost:8080";
  const scopes = ["user-top-read", "user-read-recently-played"];

  // If there is no token, redirect to Spotify authorization
  if (!_token) {
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      "%20"
    )}&response_type=token&show_dialog=true`;
  }
// Make a call using the token
$.ajax({
  url: "https://api.spotify.com/v1/me/top/artists",
  type: "GET",
  beforeSend: function(xhr) {
    xhr.setRequestHeader("Authorization", "Bearer " + _token);
  },
  success: function(data) {
    // Do something with the returned data
    
    data.items.map(function(artist) {
      let item = $("<li>" + artist.name + "</li>");
      item.appendTo($("#top-artists"));
    });
  }
})

  $.ajax({
    url: "https://api.spotify.com/v1/me/top/tracks",
    type: "GET",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "Bearer " + _token);
    },
    success: function(data) {
      // Do something with the returned data
      data.items.map(function(artist) {
        let item = $("<li>" + artist.name + "</li>");
        item.appendTo($("#top-tracks"));
      });
    }
  });
})
