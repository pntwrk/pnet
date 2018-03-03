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
        channelRef.orderByKey().equalTo(chip.tag).on("child_added",function(snapshot){
          console.log("ID: " + snapshot.val().id);
          databaseRef.child(currentUser.uid).child("Channels").child(chip.tag).set({
            id:snapshot.val().id 
          });
        });
        //databaseRef.child(currentUser.uid).child('Channels').update({'username':uname});
        //console.log(currentUser); //this returns my user object 
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
        channelRef.orderByKey().equalTo(chip.tag).on("child_added",function(snapshot){
          console.log("ID: " + snapshot.val().id);
          databaseRef.child(currentUser.uid).child("Channels").child(chip.tag).remove();
        });
    });    
  });
});
