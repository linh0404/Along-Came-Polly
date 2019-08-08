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
