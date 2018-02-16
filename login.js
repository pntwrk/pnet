//Immediately invoked function
(function (){

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

	//Create a database reference to the child "Users"
	var databaseRef = firebase.database().ref().child("Users");

	//Set variables to the input elements
	var usremail = document.getElementById("email");
	var usrpass = document.getElementById("password");


	//Event listener for the login button - calls function defined inline when "clicked":
	document.getElementById("loginBtn").addEventListener("click", function () {

		//Get input values
		var mail = usremail.value;
		var pass = usrpass.value;


		//Create a new user with email and password
		/*if mail does not contain "@" search for username in database.
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
  		}
			else {
    	document.getElementById("loginerr").style.display = "block";
  		}
		});
	});

	}, false);

}())
