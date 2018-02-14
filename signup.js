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
	var usrfname = document.getElementById("full_name");
	var usrname = document.getElementById("username");
	var usrpass = document.getElementById("password");
	
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
	document.getElementById("signUpBtn").addEventListener("click", function () {

		//Get input values
		var uname = usrname.value;
		var pass = usrpass.value;
		var uemail = usremail.value;
		var fname = usrfname.value;

		//Create a new user with email and password
		/*Because of async function calls, use .then promise, 
		which indicates that the inline function written in .then should be 
		invoked only after createUserWithEmailAndPassword function is done executing.
		.catch is used to catch any exceptions thrown by the createUserWith.. function.
		*/
		firebase.auth().createUserWithEmailAndPassword(uemail,pass).then(function(){
			currentUser = firebase.auth().currentUser;
			console.log(currentUser);

			databaseRef.child(currentUser.uid).set({
				email: uemail,
				email1: currentUser.email,
				full_name: fname,
				username: uname,
				password: pass
			});
			window.alert("Registered successfully!");
		}).catch(function(error){
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// ...
			console.log(errorMessage);
		});
	}, false);
	
}())