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
}())
