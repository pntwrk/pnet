
var user_shortDesc = document.getElementById("shortDesc");
var user_about = document.getElementById("about");
var user_dob = document.getElementById("dob");
var user_location = document.getElementById("searchTextField");

$('.datepicker').pickadate({
   format: 'dd/mm/yyyy',
   selectMonths: true, // Creates a dropdown to control month
   selectYears: 15, // Creates a dropdown of 15 years to control year,
   //format: 'dd-mm-yyyy'
   today: 'Today',
   clear: 'Clear',
   close: 'Ok',
   closeOnSelect: false // Close upon selecting a date,

 });

function initialize() {
var input = document.getElementById('searchTextField');
new google.maps.places.Autocomplete(input);
}

google.maps.event.addDomListener(window, 'load', initialize);

//Add Firebase to our website
var config = {
    apiKey: "AIzaSyBmWPXdsRK7SuBFrvUZKE5rw-9nxLwx0iI",
    authDomain: "pict-network.firebaseapp.com",
    databaseURL: "https://pict-network.firebaseio.com",
    projectId: "pict-network",
    storageBucket: "pict-network.appspot.com",
    messagingSenderId: "51789037614"
};
firebase.initializeApp(config);


var databaseRef = firebase.database().ref().child("Users");
var name;
var conUser;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log("Connected");
    conUser=user;
    name=user.displayName;
    console.log(name);
    console.log(user);
    document.getElementById("welcomeName").innerHTML="Welcome "+name+"!";
  } else {
    // No user is signed in.
    console.log("Not Connected");
  }
});document.getElementById("bio_submitBtn").addEventListener("click", function () {
  var usrshortDesc = user_shortDesc.value;
  var userAbout = user_about.value;
  var usrdob = user_dob.value;
  var usrlocation = user_location.value;
  databaseRef.child(conUser.uid).update({
    shortDesc:usrshortDesc,
    about:userAbout,
    dob:usrdob,
    location:usrlocation
  });
  window.location = "profile.html";
}, false);
