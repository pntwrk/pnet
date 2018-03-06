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

//For Signup Web Page:
//Create a database reference to the child "Users"
var databaseRef = firebase.database().ref().child("Users");

//Set variables to the input elements
var signup_usremail = document.getElementById("signup_email");
var signup_usrfirstname = document.getElementById("signup_first_name");
var signup_usrlastname = document.getElementById("signup_last_name");
var signup_usrname = document.getElementById("signup_username");
var signup_usrpass = document.getElementById("signup_password");

//Get the current user
var currentUser = firebase.auth().currentUser;

//Check if any current user is already logged in
if(currentUser){ //i.e. a user is logged in
//Sign out the current user
firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  console.log(errorMessage);
});     
}


//Event listener for the signup button - calls function defined inline when "clicked":
document.getElementById("signup_signUpBtn").addEventListener("click", function () {

  var signup_err = 0; //Used to check if any error has occured
  //Get input values
  var signup_uname = signup_usrname.value;
  var signup_pass = signup_usrpass.value;
  var signup_uemail = signup_usremail.value;
  var signup_firstName = signup_usrfirstname.value;
  var signup_lastName = signup_usrlastname.value;
  //Create a new user with email and password
  /*Because of async function calls, use .then promise, 
  which indicates that the inline function written in .then should be 
  invoked only after createUserWithEmailAndPassword function is done executing.
  .catch is used to catch any exceptions thrown by the createUserWith.. function.
  */
  firebase.auth().createUserWithEmailAndPassword(signup_uemail,signup_pass).then(function(){
    currentUser = firebase.auth().currentUser;
    console.log(currentUser);

    databaseRef.child(currentUser.uid).set({
      email: signup_uemail,
      first_name: signup_firstName,
      last_name: signup_lastName,
      username: signup_uname
  });
}).catch(function(error){
    signup_err = 1;
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    window.alert(errorMessage);
  }).then(function(){ //Set user profile. (use .then promise to make sure createUserWith... is done).
    if(!signup_err){//If no error
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: signup_uname
        //photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function() {
        console.log("Profile Set");
        show_bio_page();
        //window.location = "bio.html";
        window.alert("Registered successfully!");
        //window.location = "usrname.html";
    }).catch(function(error) {
        signup_err = 1;
        // An error occured.
        var errorMessage = error.message;
        console.log(errorMessage);
        window.alert(errorMessage);
    });
}
  }).then(function(){ //Send an email verification. (use .then promise to make sure createUserWith... & user profile has been set).
    if(!signup_err){//If no error
      var user = firebase.auth().currentUser;
      user.sendEmailVerification().then(function() {
        console.log("Email Verification Sent!");
    }).catch(function(error) {
        signup_err = 1;
        // An error occured.
        var errorMessage = error.message;
        console.log(errorMessage);
        window.alert(errorMessage);
    }); 
}   
});
}, false);

document.getElementById("signup_signUpFacebook").addEventListener("click", function(){
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().useDeviceLanguage();
  provider.addScope('email, public_profile');
  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  //Search for user.uid
  var flag = 1;
  databaseRef.orderByKey().equalTo(user.uid).on("child_added", function(snapshot){
    if(snapshot){
      console.log("Already Exists!");
      flag = 0;
  } 
});
  if(flag){
    console.log("Doesn't exist!");
    FB.getLoginStatus(function(response){
      if(response.status==='connected'){
        console.log("Logged in!");
        FB.api('/me',{fields: 'email, first_name, last_name', access_token: token}, function(response){
          databaseRef.child(user.uid).set({
            email: response.email,
            first_name: response.first_name,
            last_name: response.last_name
        });
          console.log("Stored in the database!");
          console.log(response);
          //window.location = "/usrname.html";
          //show_set_username_page();
          //window.location = "bio.html";
          show_bio_page();
      });
    }
});
}
console.log("Authenticated!");
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  console.log("Error Encountered:");
  console.log(errorMessage);
  //console.log(email);
  //console.log(credential);
});
} ,false);

document.getElementById("signup_signUpGoogle").addEventListener("click",function(){
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile, https://www.googleapis.com/auth/userinfo.email');
    firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  //databaseRef.orderByKey().equalTo(user.uid).on("child_added", function(snapshot) {
    //if(snapshot.val()){
      //console.log("Already Exists!");
  //}
  //else{
        //Doesn't exist
        //console.log("Does not exist!");
        var user_first_name;
        var user_last_name;
        console.log(user);
        var i=0;
        user.displayName.split(" ").forEach(function(word){
          if(i==0)
            user_first_name = word;
          else if(i==1)
            user_last_name = word;
          i+=1
        });
        databaseRef.child(user.uid).set({
          email: user.email,
          first_name: user_first_name,
          last_name: user_last_name
        }).then(function(){
          //window.location = "/usrname.html";
          //show_set_username_page();
          //window.location = "bio.html";
          show_bio_page();
        });
      console.log("Stored in database");
  //}
//});
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  console.log(errorMessage);
});
}, false);  

//For login page:
//Set variables to the input elements
var login_usremail = document.getElementById("login_email");
var login_usrpass = document.getElementById("login_password");


//Event listener for the login button - calls function defined inline when "clicked":
document.getElementById("loginBtn").addEventListener("click", function () {

    //Get input values
    var mail = login_usremail.value;
    var pass = login_usrpass.value;
    //Create a new user with email and password
    /*If mail does not contain "@" search for username in database.
        If found replace mail with username's email.
        */
        var databaseRef = firebase.database().ref().child("Users");
        if(mail.search("@")==-1)
        {
            databaseRef.orderByChild("username").equalTo(mail).on("child_added", function(snapshot) {
                mail = snapshot.val().email;
            });

        }
    /*Sign in with Email and Password , if signed in load home page else display
        login fail error.
        */
        firebase.auth().signInWithEmailAndPassword(mail,pass).then(function(){
        }).catch(function(error){
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    }).then(function(){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                window.alert("Logged In!");
                document.getElementById("loginerr").style.display = "none";
                //window.location = "interests.html";
                window.location = "profile.html";
            }
            else {
                document.getElementById("loginerr").style.display = "block";
            }
        });
    });

}, false);


document.getElementById("loginFacebook").addEventListener("click", function(){
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().useDeviceLanguage();
    provider.addScope('email, public_profile');
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The logged-in user info.
        var user = result.user;

        // ...
        console.log("Authenticated!");
        FB.getLoginStatus(function(response){
            if(response.status==='connected'){
                console.log("Logged in!");
                window.location = "profile.html";
            }
        });
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log("Error Encountered:");
        console.log(errorMessage);
        //console.log(email);
        //console.log(credential);
    });
} ,false);

document.getElementById("loginGoogle").addEventListener("click",function(){
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile, https://www.googleapis.com/auth/userinfo.email');
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The logged-in user info.
        var user = result.user;
        window.location = "profile.html";
        console.log(user);
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(errorMessage);
    });
}, false);

//For forgot password:
//Set variables to the input elements
var forgot_pass_usremail = document.getElementById("forgot_pass_email");

document.getElementById("forgot_pass_submitBtn").addEventListener("click", function () {

    //Create a new user with email and password
    /*Because of async function calls, use .then promise,
    which indicates that the inline function written in .then should be
    invoked only after createUserWithEmailAndPassword function is done executing.
    .catch is used to catch any exceptions thrown by the createUserWith.. function.
    */
    var auth = firebase.auth();
    var emailAddress = forgot_pass_usremail.value;

    firebase.auth().useDeviceLanguage();

    auth.sendPasswordResetEmail(emailAddress).then(function() {
      console.log("Email sent");
  }).catch(function(error) {
    // An error happened.
    var errorCode = error.code;
    var errorMessage = error.message;
    document.getElementById("emailerr").style.display = "block";
    console.log(errorMessage);
});

}, false);

//For set username page:
    //Set variables to the input elements
    var set_uname_usrname = document.getElementById("set_uname_username");
    document.getElementById("setUsername").addEventListener("click", function(){
        var uname = set_uname_usrname.value;
        var currentUser = firebase.auth().currentUser;
        if(currentUser){
            databaseRef.child(currentUser.uid).update({'username':uname});
            console.log("Set!");
            show_bio_page();
        }
        else
            console.log("User not defined!");
    }, false);

//For set interests page:
var chip = {
  tag: 'chip content',
  image: '',
  id: '1'
};

$(document).ready(function(){
  $('.chips').material_chip();
  $('.chips-autocomplete').material_chip({
    autocompleteOptions: {
      data: {
        'C': null,
        'C++': null,
        'Java': null,
        'JavaScript': null,
        'Python': null,
        'HTML': null,
        'CSS': null,
        'R': null,
        'Swift': null,
        'C#': null,
        'PHP': null,
        'Pearl': null,
        'Ruby': null,
        'Assembly Language': null,
        'Objective-C': null,
        'Go': null,
        'Scala': null,
        'MATLAB': null,
        'Web Development': null,
        'Android': null,
        'App Development': null,
        'Competitive Coding': null,
        'Machine Learning': null,
        'Deep Learning': null,
        'Data Science': null,
        'Data Structures': null,
        'Algorithms': null,
        'Physics': null,
        'Mathematics': null,
        'Chemisty': null,
        'Science': null,
        'Cosmology': null,
        'Space': null,
        'Management': null,
        'Startups': null
      },
      limit: 3,
      minLength: 1
    }
  });
  $('.chips').on('chip.add', function(e, chip){
    var currentUser;
    var databaseRef = firebase.database().ref().child("Users");
    firebase.auth().onAuthStateChanged(function(user){
        currentUser = user;
        var channelRef = firebase.database().ref().child("Channels");

        //For channels stored by key:
        channelRef.orderByChild("name").equalTo(chip.tag).on("child_added",function(snapshot){
          console.log(snapshot.key);
          console.log("Name: ", snapshot.val().name);
          databaseRef.child(currentUser.uid).child("Channels").child(snapshot.key).set({
            name:snapshot.val().name 
          });
        });

        /*//Works for channels stored by name:
        channelRef.orderByKey().equalTo(chip.tag).on("child_added",function(snapshot){
          console.log("ID: " + snapshot.val().id);  
          databaseRef.child(currentUser.uid).child("Channels").child(chip.tag).set({
            id:snapshot.val().id 
          });
        });*/

        //console.log(chip);
        //console.log(chip.tag);
    });
  });
  $('.chips').on('chip.delete', function(e, chip){
    var currentUser;
    var databaseRef = firebase.database().ref().child("Users");
    firebase.auth().onAuthStateChanged(function(user){
        currentUser = user;
        var channelRef = firebase.database().ref().child("Channels");

        //For channels stored by key:
        channelRef.orderByChild("name").equalTo(chip.tag).on("child_added",function(snapshot){
          databaseRef.child(currentUser.uid).child("Channels").child(snapshot.key).remove();
        });

        /*//Works for channels stored by name:
        channelRef.orderByKey().equalTo(chip.tag).on("child_added",function(snapshot){
          console.log("ID: " + snapshot.val().id);
          databaseRef.child(currentUser.uid).child("Channels").child(chip.tag).remove();
        });*/
    });    
  });
});

document.getElementById("setInterests").addEventListener("click",function(){
    window.location = "profile.html";
},false);

//For setting bio page:
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

var conUser;
function init_bio_page(){
    google.maps.event.addDomListener(window, 'load', initialize);
    var name;
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
    });
}
document.getElementById("bio_submitBtn").addEventListener("click", function () {
  var usrshortDesc = user_shortDesc.value;
  var userAbout = user_about.value;
  var usrdob = user_dob.value;
  var usrlocation = user_location.value;
  databaseRef.child(conUser.uid).update({
    description:usrshortDesc,
    about:userAbout,
    dob:usrdob,
    location:usrlocation
  });
  show_interests_page();
}, false);

var signup_element = document.getElementById("index_signup");
var login_element = document.getElementById("index_login");
var set_username_element = document.getElementById("index_set_username");
var forgot_password_element = document.getElementById("index_forgot_password");
var interests_element = document.getElementById("set_interests");
var set_bio_element = document.getElementById("bio");


function show_signup_page(){
      if(signup_element.style.display=='none'){
        signup_element.style.display = 'block';
        login_element.style.display = 'none';
        set_username_element.style.display = 'none';
        forgot_password_element.style.display = 'none';
        interests_element.style.display = 'none';
        set_bio_element.style.display = 'none';
    }
}
function show_login_page(){
    if(login_element.style.display=='none'){
        login_element.style.display = 'block';
        signup_element.style.display = 'none';
        set_username_element.style.display = 'none';
        forgot_password_element.style.display = 'none';
        interests_element.style.display = 'none';
        set_bio_element.style.display = 'none';
    }
}
function show_set_username_page(){
    if(set_username_element.style.display=='none'){
        set_username_element.style.display = 'block';
        signup_element.style.display = 'none';
        login_element.style.display = 'none';
        forgot_password_element.style.display = 'none';
        interests_element.style.display = 'none';
        set_bio_element.style.display = 'none';
    }
}
function show_forgot_password_page(){
    if(forgot_password_element.style.display=='none'){
        forgot_password_element.style.display = 'block';
        signup_element.style.display = 'none';
        login_element.style.display = 'none';
        set_username_element.style.display = 'none';
        interests_element.style.display = 'none';
        set_bio_element.style.display = 'none';
    }
}
function show_interests_page(){
    if(interests_element.style.display=='none'){
        interests_element.style.display = 'block';
        forgot_password_element.style.display = 'none';
        signup_element.style.display = 'none';
        login_element.style.display = 'none';
        set_username_element.style.display = 'none';
        set_bio_element.style.display = 'none';
    }  
}

function show_bio_page(){
    if(set_bio_element.style.display=='none'){
        set_bio_element.style.display = 'block';
        interests_element.style.display = 'none';
        forgot_password_element.style.display = 'none';
        signup_element.style.display = 'none';
        login_element.style.display = 'none';
        set_username_element.style.display = 'none';
    }    
    init_bio_page();
}