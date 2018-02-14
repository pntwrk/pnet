var usrname = document.getElementById("uname");
var usrpass = document.getElementById("pass");
var submt = document.getElementById("submt");

var logusrname = document.getElementById("luname");
var logusrpass = document.getElementById("lpass");

function submit(){
  var firebaseRef=firebase.database().ref().child("New_Users");

  var uname = usrname.value;
  var pass = usrpass.value;
  firebase.auth().createUserWithEmailAndPassword(uname,pass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    window.alert(errorMessage);
  })

  firebaseRef.push().set({
    username:uname,
    password:pass
  });
  window.alert("Done");
}

function login(){
  var luname = logusrname.value;
  var lpass = logusrpass.value;
  firebase.auth().signInWithEmailAndPassword(luname, lpass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    window.alert(errorMessage)
  });
  var user = firebase.auth().currentUser;
  firebase.auth().onAuthStateChanged(fireBaseUser => {
    if (fireBaseUser) {
      // User is signed in.
      window.alert("Logged in");
    } 
    else {
      // No user is signed in.
      window.alert("Not logged in");
    }
  });
}

function signout(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}

function currdet(){
  var user = firebase.auth().currentUser;
  firebase.auth().onAuthStateChanged(fireBaseUser => {
    if (fireBaseUser) {
      // User is signed in.
      document.getElementById("currusrname").innerHTML =user.email;
    } 
    else {
      // No user is signed in.
      document.getElementById("currusrname").innerHTML ="NULL";
    }
  });
}