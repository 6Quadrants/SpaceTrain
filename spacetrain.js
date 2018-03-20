// Initialize Firebase
var config = {
    apiKey: "AIzaSyCQpXxwTx5KPrer9whqkAzpeJR1BisyQ8s",
    authDomain: "spacetrain-ff06d.firebaseapp.com",
    databaseURL: "https://spacetrain-ff06d.firebaseio.com",
    projectId: "spacetrain-ff06d",
    storageBucket: "spacetrain-ff06d.appspot.com",
    messagingSenderId: "574970482305"
  };

firebase.initializeApp(config);

var database = firebase.database();

// submit button - grabs input info on click
$("#add-user").on("click", function(event) {
    event.preventDefault();


//   form inputs
  var trainName = $("#trainname-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var firstTrain = $("#first-train-input").val().trim();
  var trainFreq = $("#train-freq-input").val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    first: firstTrain,
    frequency: trainFreq
};


    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTrainConverted);

    var currentTime = moment ();
    console.log("current time: " + moment(currentTime).format("hh:mm"));

    var difference = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("difference in time: " + difference);

    var tRemainder = difference % trainFreq;
    var minNextTrain = trainFreq - tRemainder;

    var nextTrain = moment().add(minNextTrain).format("hh:mm");
    var nextTrain = moment().add()

    console.log("arrival time " + moment(nextTrain).format("hh:mm"));
    console.log("minutes till next " + minNextTrain);
    console.log(trainFreq);
    console.log(tRemainder);
    console.log("next train " + nextTrain);
    
    
  // local object
 

firebase.database().ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);

  $("#trainname-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#train-freq-input").val("");

});

// push data to firebase

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().first;
  var trainFreq = childSnapshot.val().frequency;
//   var minNextTrain = childSnapShot.val();


//   append HTML

  $("#space-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFreq + "</td><td>" + firstTrain + "</td>");

});

