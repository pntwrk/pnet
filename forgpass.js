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

  document.getElementById("submitBtn").addEventListener("click", function () {

		//Create a new user with email and password
		/*Because of async function calls, use .then promise,
		which indicates that the inline function written in .then should be
		invoked only after createUserWithEmailAndPassword function is done executing.
		.catch is used to catch any exceptions thrown by the createUserWith.. function.
		*/


      var auth = firebase.auth();
      var emailAddress = usremail.value;

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
}())
