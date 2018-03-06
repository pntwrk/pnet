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

(function(){
    var currentUser;
    var databaseRef = firebase.database().ref().child("Users");
    firebase.auth().onAuthStateChanged(function(user){
        currentUser = user;
        if(currentUser){
	        emailRef = firebase.database().ref().child("Users").child(currentUser.uid).child("email");
	        emailRef.once('value').then(function(snapshot){
	        	console.log("Email: " + snapshot.val());
	        	document.getElementById("email").innerHTML = "Email: " + snapshot.val();
	        });
	        fnameRef = firebase.database().ref().child("Users").child(currentUser.uid).child("first_name");
	        fnameRef.once('value').then(function(snapshot){
	        	console.log("First Name: " + snapshot.val());
	        	document.getElementById("first_name").innerHTML = "First Name: " + snapshot.val();
	        });
	        lnameRef = firebase.database().ref().child("Users").child(currentUser.uid).child("last_name");
	        lnameRef.once('value').then(function(snapshot){
	        	console.log("Last Name: " + snapshot.val());
	        	document.getElementById("last_name").innerHTML = "Last Name: " + snapshot.val();
	        });
	        unameRef = firebase.database().ref().child("Users").child(currentUser.uid).child("username");
	        unameRef.once('value').then(function(snapshot){
	        	console.log("Username: " + snapshot.val());
	        	document.getElementById("username").innerHTML = "Username: " + snapshot.val();
	        });
	        aboutRef = firebase.database().ref().child("Users").child(currentUser.uid).child("about");
	        aboutRef.once('value').then(function(snapshot){
	        	console.log("About: " + snapshot.val());
	        	document.getElementById("about").innerHTML = "About: " + snapshot.val();
	        });
	        dobRef = firebase.database().ref().child("Users").child(currentUser.uid).child("dob");
	        dobRef.once('value').then(function(snapshot){
	        	console.log("DOB: " + snapshot.val());
	        	document.getElementById("dob").innerHTML = "DOB: " + snapshot.val();
	        });
	        locationRef = firebase.database().ref().child("Users").child(currentUser.uid).child("location");
	        locationRef.once('value').then(function(snapshot){
	        	console.log("Username: " + snapshot.val());
	        	document.getElementById("location").innerHTML = "Location: " + snapshot.val();
	        });
	        descriptionRef = firebase.database().ref().child("Users").child(currentUser.uid).child("description");
	        descriptionRef.once('value').then(function(snapshot){
	        	console.log("Description: " + snapshot.val());
	        	document.getElementById("description").innerHTML = "Description: " + snapshot.val();
	        });
	        var followedChannels = [];
	        channelRef = firebase.database().ref().child("Users").child(currentUser.uid).child("Channels");
	        channelRef.orderByValue().on("child_added",function(snapshot){
	        	//console.log(snapshot.key); //Gives the channel key
	        	//console.log(snapshot.val().name); //Gives the channel name
	        	followedChannels.push(snapshot.val().name);
		        //console.log("Followed Channels: " + followedChannels);
		        document.getElementById("followed_channels").innerHTML = "Followed Channels: " + followedChannels;
	        });
	        if(currentUser.emailVerified) document.getElementById("email_verified").innerHTML = "Email Verified: True";
	        else document.getElementById("email_verified").innerHTML = "Email Verified: False";
    	}
    	else{
    		window.alert("Login First!");
    	}
    });

}());

document.getElementById("log_out_btn").addEventListener("click",function(){
	firebase.auth().signOut().then(function() {
		console.log('Signed Out');
	}, function(error) {
		console.error('Sign Out Error', error);
	});
},false);