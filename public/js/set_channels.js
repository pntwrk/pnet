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

document.getElementById("set_channels").addEventListener("click",function(){
	var data = [
	"C",
	"C++",
	"Java",
	"JavaScript",
	"Python",
	"HTML",
	"CSS",
	"R",
	"Swift",
	"PHP",
	"Pearl",
	"Ruby",
	"Assembly Language",
	"Objective-C",
	"Go",
	"Scala",
	"MATLAB",
	"Web Development",
	"Android",
	"App Development",
	"Competitive Coding",
	"Machine Learning",
	"Deep Learning",
	"Data Science",
	"Data Structures",
	"Algorithms",
	"Physics",
	"Mathematics",
	"Chemisty",
	"Science",
	"Cosmology",
	"Space",
	"Management",
	"Startups"
	]
	var len = data.length;
	var databaseRef = firebase.database().ref().child("Channels");
	for(var i=0;i<len;i++){
		var newKey = databaseRef.push().key;
		databaseRef.child(data[i]).set({
			id : newKey
		})
		/*databaseRef.set({
			[data[i]]:newKey
		});*/
		console.log("Added: " + data[i]);
	}
},false);