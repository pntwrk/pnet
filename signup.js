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
	var usrfirstname = document.getElementById("first_name");
	var usrlastname = document.getElementById("last_name");
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

		var err = 0; //Used to check if any error has occured
		//Get input values
		var uname = usrname.value;
		var pass = usrpass.value;
		var uemail = usremail.value;
		var firstName = usrfirstname.value;
		var lastName = usrlastname.value;
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
				first_name: firstName,
				last_name: lastName,
				username: uname,
				password: pass
			});
		}).catch(function(error){
			err = 1;
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorMessage);
			window.alert(errorMessage);
		}).then(function(){ //Set user profile. (use .then promise to make sure createUserWith... is done).
			if(!err){//If no error
				var user = firebase.auth().currentUser;
				user.updateProfile({
					displayName: uname
					//photoURL: "https://example.com/jane-q-user/profile.jpg"
				}).then(function() {
					console.log("Profile Set");
				}).catch(function(error) {
					err = 1;
					// An error happened.
					var errorMessage = error.message;
					console.log(errorMessage);
					window.alert(errorMessage);
				});
			}
		}).then(function(){ //Send an email verification. (use .then promise to make sure createUserWith... & user profile has been set).
			if(!err){//If no error
				var user = firebase.auth().currentUser;

				user.sendEmailVerification().then(function() {
					console.log("Email Verification Sent!");
				}).catch(function(error) {
					err = 1;
					// An error happened.
					var errorMessage = error.message;
					console.log(errorMessage);
					window.alert(errorMessage);
				});	
				window.alert("Registered successfully!\nVerify your email to continue.");
			}		
		});
	}, false);

	document.getElementById("signUpFacebook").addEventListener("click", function(){
		var provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().useDeviceLanguage();
		provider.addScope('email, public_profile');
		firebase.auth().signInWithPopup(provider).then(function(result) {
			// This gives you a Facebook Access Token. You can use it to access the Facebook API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var user = result.user;
			// ...
			console.log("Authenticated!");
			/*FB.api('/me',{fields: 'first_name', access_tocken: token}, function(response){
				console.log(response);
			});*/
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
		}).then(function(user,token){
			FB.api('/me',{fields: 'first_name', access_tocken: token}, function(response){
				console.log(response);
			});			
		});
	} ,false);

}())