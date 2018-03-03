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
	        	document.getElementById("email").innerHTML = snapshot.val();
	        });
	        fnameRef = firebase.database().ref().child("Users").child(currentUser.uid).child("first_name");
	        fnameRef.once('value').then(function(snapshot){
	        	console.log("First Name: " + snapshot.val());
	        	document.getElementById("first_name").innerHTML = snapshot.val();
	        });
	        lnameRef = firebase.database().ref().child("Users").child(currentUser.uid).child("last_name");
	        lnameRef.once('value').then(function(snapshot){
	        	console.log("Last Name: " + snapshot.val());
	        	document.getElementById("last_name").innerHTML = snapshot.val();
	        });
	        unameRef = firebase.database().ref().child("Users").child(currentUser.uid).child("username");
	        unameRef.once('value').then(function(snapshot){
	        	console.log("Username: " + snapshot.val());
	        	document.getElementById("username").innerHTML = snapshot.val();
	        });

	        var followedChannels = [];
	        channelRef = firebase.database().ref().child("Users").child(currentUser.uid).child("Channels");
	        channelRef.orderByValue().on("child_added",function(snapshot){
	        	//console.log(snapshot.key); //Gives the channel key
	        	//console.log(snapshot.val().name); //Gives the channel name
	        	followedChannels.push(snapshot.val().name);
		        //console.log("Followed Channels: " + followedChannels);
		        document.getElementById("followed_channels").innerHTML = followedChannels;
	        });
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