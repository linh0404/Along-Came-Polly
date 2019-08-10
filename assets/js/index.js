(function(window, document) {
  // Replace with your app's client ID, redirect URI and desired scopes
  const SPOTIFY_CLIENTID = "8eb9c5f7f3b048bc9184193d33afdc96";
  const SPOTIFY_REDIRECTURI = "https://linh0404.github.io/Along-Came-Polly";
  const SPOTIFY_SCOPES = ["user-top-read", "user-read-recently-played"];
  // Replace with your ticket mater api key
  const TICKETMASTER_APIKEY = "COsXEH07ztMABw0SgNFNxALf8IefVSt3";
  // Firebase config
  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDuCJ5AsUB46ZdBok3mLLZNWL_7dWGBMb4",
    authDomain: "project2-11de5.firebaseapp.com",
    databaseURL: "https://project2-11de5.firebaseio.com",
    projectId: "project2-11de5",
    storageBucket: "",
    messagingSenderId: "1031313270344",
    appId: "1:1031313270344:web:9dc709f2d4ca2dc7"
  };
  let favourites = [];
  setSpotifyButtonEventListener();
  setTicketMasterEventListener();
  const fbDatabase = connectFirebase();
  const spotifyAccessToken = getSpotifyAccessTokenFromWindowHash();
  if (!spotifyAccessToken) {
    return;
  }
  const artists = getSpotifyTopArtists(spotifyAccessToken);
  const tracks = getSpotifyTopTracks(spotifyAccessToken);
  // Application
  Promise.all([artists, tracks]).then(function(values) {
    renderSpotifyTopArtists(values[0]);
    renderSpotifyTopTracks(values[1]);
    // Load up ticketmaster
    var ticketMasterSearches = [];
    for (var i = 0; i < values[0].length && i < 20; i++) {
      var artist = values[0][i].name;
      // showArtistEvent = "Marlo"
      // eventFromTicketMaster(showArtistEvent, false);
      ticketMasterSearches.push(getFromTicketMasterApi(artist));
    }
    Promise.all(ticketMasterSearches).then(function(results) {
      const mergedTicketMasterResult = results.reduce(function(
        accumulator,
        currentValue
      ) {
        return accumulator.concat(currentValue);
      },
      []);
      renderTicketMasterResult(
        "#displaySearchResult",
        mergedTicketMasterResult
      );
    });
    // Scroll to result
    $("body").addClass("result");
    $(".wrapper__content").animate(
      {
        scrollTop: $(".ticketmaster__results").offset().top,
        scrollLeft: 0
      },
      500
    );
  });
  // Functions Spotify
  function renderSpotifyTopArtists(items) {
    items.map(function(artist) {
      let item = $("<li>" + artist.name + "</li>");
      item.appendTo($("#top-artists"));
    });
  }
  function renderSpotifyTopTracks(items) {
    items.map(function(artist) {
      let item = $("<li>" + artist.name + "</li>");
      item.appendTo($("#top-tracks"));
    });
  }
  function getSpotifyTopArtists(spotifyAccessToken) {
    return getFromSpotifyApi(spotifyAccessToken, "top/artists");
  }
  function getSpotifyTopTracks(spotifyAccessToken) {
    return getFromSpotifyApi(spotifyAccessToken, "top/tracks");
  }
  function getFromSpotifyApi(spotifyAccessToken, path) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: "https://api.spotify.com/v1/me/" + path,
        type: "GET",
        beforeSend: function(xhr) {
          xhr.setRequestHeader("Authorization", "Bearer " + spotifyAccessToken);
        },
        success: function(data) {
          resolve(data.items);
        },
        error: function() {
          reject();
        }
      });
    });
  }
  function getSpotifyAccessTokenFromWindowHash() {
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
    // clear hash
    window.location.hash = "";
    return hash.access_token || null;
  }
  function setSpotifyButtonEventListener() {
    $("#spotify").on("click", function(e) {
      e.preventDefault();
      const authEndpoint = "https://accounts.spotify.com/authorize";
      window.location = `${authEndpoint}?client_id=${SPOTIFY_CLIENTID}&redirect_uri=${SPOTIFY_REDIRECTURI}&scope=${SPOTIFY_SCOPES.join(
        "%20"
      )}&response_type=token&show_dialog=true`;
    });
  }
  // Fucntions Ticketmaster
  function setTicketMasterEventListener() {
    $("#ticketMasterSearch").on("submit", function(e) {
      e.preventDefault();
      var query = $("#artistSearchInput").val();
      getFromTicketMasterApi(query).then(function(results) {
        renderTicketMasterResult("#displaySearchResult", results);
      });
      return false;
    });
  }
  function getFromTicketMasterApi(artist) {
    return new Promise(function(resolve, reject) {
      var queryURL =
        "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" +
        TICKETMASTER_APIKEY +
        "&countryCode=AU&limit=4&keyword=" +
        artist;
      try {
        $.ajax({
          url: queryURL,
          method: "GET",
          async: true,
          crossDomain: true,
          dataType: "json",
          success: function(response) {
            if (typeof response["_embedded"] !== "undefined") {
              return resolve(response["_embedded"].events);
            }
            resolve([]);
          },
          error: function() {
            resolve([]);
          }
        });
      } catch (e) {
        resolve([]);
      }
    });
  }
  function renderTicketMasterResult(target, items) {
    // Clear Previous Results
    $(target).empty();
    items.forEach(function(item) {
      // create Bootstrap card
      var card = $('<div class="card card-event"></div>');
      // image
      var image = $('<img class="artist-image card-img-top" />');
      image.attr("src", item.images[0].url);
      card.append(image);
      var body = $('<div class="card-body"></div>');
      var title = $('<h5 class="card-title">' + item.name + '</h5>"');
      body.append(title);
      card.append(body);
      var list = $('<ul class="list-group list-group-flush"></ul>');
      var starts = moment(
        item.dates.start.localDate + " " + (item.dates.start.localTime || "")
      );
      var date;
      if (item.dates.start.localTime) {
        date = $(
          '<li class="list-group-item event-time">' +
            starts.format("dddd, MMMM Do YYYY, h:mm:ss a") +
            "</li>"
        );
      } else {
        date = $(
          '<li class="list-group-item event-time">' +
            starts.format("dddd, MMMM Do YYYY") +
            "</li>"
        );
      }
      list.append(date);
      if (
        typeof item._embedded.venues !== "undefined" &&
        item._embedded.venues.length > 0
      ) {
        var venue = $(
          '<li class="list-group-item event-venue"><strong>' +
            item._embedded.venues[0].name +
            "</strong>" +
            item._embedded.venues[0].city.name +
            ", " +
            item._embedded.venues[0].country.name +
            "</li>"
        );
        list.append(venue);
      }
      card.append(list);
      var linkbody = $('<div class="card-body"></div>');
      var link = $('<a target="_blank" class="card-link">Book tickets</a>"');
      link.attr("href", item.url);
      linkbody.append(link);
      if (typeof item.child !== "undefined") {
        var removeFav = $('<span class="card-link">Unfavourite</span>"');
        linkbody.append(removeFav);
        removeFav.on("click", function() {
          item.child.ref.remove();
        });
      } else {
        var fav = $('<span class="card-link">Favourite</span>"');
        linkbody.append(fav);
        fav.on("click", function() {
          const favId = "fav_" + new Date().getTime();
          fbDatabase.ref("/fav/" + favId).push({ ...item, favId: favId });
        });
      }
      card.append(linkbody);
      $(target).append(card);
    });
  }
  // Firebase
  function connectFirebase() {
    // Initialize Firebase
    firebase.initializeApp(FIREBASE_CONFIG);
    //variable to store database name
    var database = firebase.database();
    database.ref("/fav").on("child_added", function(child) {
      Object.values(child.val()).forEach(function(a) {
        favourites.push({ ...a, child: child });
      });
      renderTicketMasterResult("#displayFavouritesResult", favourites);
    });
    database.ref("/fav").on("child_removed", function(child) {
      Object.values(child.val()).forEach(function(a) {
        favourites = favourites.filter(function(f) {
          return f.id !== a.id;
        });
      });
      renderTicketMasterResult("#displayFavouritesResult", favourites);
    });
    console.log(favourites);
    return database;
  }
})(window, document);
