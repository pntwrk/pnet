//Immediately invoked function
(function(){
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
	var usrname = document.getElementById("username");
	document.getElementById("setUsername").addEventListener("click", function(){
		var uname = usrname.value;
		var currentUser = firebase.auth().currentUser;
		if(currentUser){
			databaseRef.child(currentUser.uid).update({'username':uname});
			console.log("Set!");
		}
		else
			console.log("User not defined!");
	}, false);
}())