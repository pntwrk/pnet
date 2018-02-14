var usremail = document.getElementById("usremail");
var usrfname = document.getElementById("usrfname");
var usrname = document.getElementById("usrname");
var usrpass = document.getElementById("usrpass");

var currentUserId = 0;
function addRecord(){
  var databaseRef = firebase.database().ref().child("Users");
  email = usremail.value;
  fullName = usrfname.value;
  username = usrname.value;
  usrpass = usrpass.value;
  databaseRef.push().set({
    Id: currentUserId,
    Email: email,
    FullName: fullName,
    Username: username,
    Password: usrpass
  });
  currentUserId+=1;
  alert("Done!");
}
