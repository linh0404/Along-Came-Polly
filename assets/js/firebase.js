// My web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDuCJ5AsUB46ZdBok3mLLZNWL_7dWGBMb4",
  authDomain: "project2-11de5.firebaseapp.com",
  databaseURL: "https://project2-11de5.firebaseio.com",
  projectId: "project2-11de5",
  storageBucket: "",
  messagingSenderId: "1031313270344",
  appId: "1:1031313270344:web:9dc709f2d4ca2dc7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//variable to store database name
var database = firebase.database();

//Object to store entire firebase database as JSON object
var firebaseDataObject = null;

//variable to store key of object to update.
var updateKey;

//variable to hold input values
var events = "";

// events object constructor

$("#findEvent").on("click", function(event) {
  event.preventDefault();

  // Grabbed values from text-boxes
  events = $("#artistSearchInput")
    .val()
    .trim();

  // Code for "Setting values in the database"
  database.ref().push({
    events: events
  });
});

// Favourites - Richard 09/08/2019
$(document).ready(function() {
  // Empty array to store favourites
  function renderFavs(favs) {
    $("#eventFavs").empty();

    for (var i = 0; i < favs.length; i++) {
      var favsEvents = $("<img id='event-fav'>");
      favsEvents.attr("src", favs[i]);
      favsEvents.attr("style", "width: 150px; height: 150px"); // appends to this size in favorites
      favsEvents.addClass("btn-space");

      $("#eventFavs").append(favsEvents); // appends to div id=#eventFavs
    }
  }
  $(".col-sm-4").hide(); // Hides the favourite

  // create on clicks to add favourites
  $(document).on("click", ".fa", function() {
    var eventFav = $(this).attr("span-image");
    favs.push(eventFav);
    renderFavs(favs);
    localStorage.setItem("favs-array", JSON.stringify(favs));
    $(".col-sm-4").show(); // displays the favourites section
  });

  // create on clicks to clear favourites
  $("#clearFavs").click(function() {
    localStorage.removeItem("favs-array");
    renderFavs(favs);
    favs = [];
    $("#eventFavs").empty();
    $(".col-sm-4").hide(); // Hides the favourite
  });

  // stores gif locally in the browser of the user
  var favs = JSON.parse(localStorage.getItem("favs-array"));
  if (!Array.isArray(favs)) {
    favs = [];
  }

  renderFavs(favs);
});
