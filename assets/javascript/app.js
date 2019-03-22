// Initialize Firebase
var config = {
    apiKey: "AIzaSyBjapi8UEVeT_1F7fnOcKdPxKs1-U-b9eg",
    authDomain: "trainscheduler-246f2.firebaseapp.com",
    databaseURL: "https://trainscheduler-246f2.firebaseio.com",
    projectId: "trainscheduler-246f2",
    storageBucket: "trainscheduler-246f2.appspot.com",
    messagingSenderId: "165406524808"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function (event) {
    event.preventDefault();
    alert("button clicked");

    var trnName = $("#train_name").val().trim();
    var destination = $("#dtn").val().trim();
    var first_tt = $("#first_tt").val().trim();
    var freq = $("#freq").val().trim();

    var newTrain = {
        trn: trnName,
        dest: destination,
        start: first_tt,
        frequency: freq
    };

    database.ref().push(newTrain);

    console.log(newTrain.trnName);
    console.log(newTrain.dest);
    console.log(newTrain.start);
    console.log(newTrain.frequency);

    alert("train added");

    $("#train_name").val("");
    $("#dtn").val("");
    $("#first_tt").val("");
    $("#freq").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trnName = childSnapshot.val().trn;
    var destination = childSnapshot.val().dest;
    var first_tt = childSnapshot.val().start;
    var freq = childSnapshot.val().frequency;

    console.log(trnName);
    console.log(destination);
    console.log(freq);

    //calculate next train arrival
    //current time minutes % interval
    //interval - remainder = x
    //current time + x

    var firstTimeConverted = moment(first_tt, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    var tMinutesTillTrain = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var newRow = $("<tr>").append(
        $("<td>").text(trnName),
        $("<td>").text(destination),
        $("<td>").text(freq),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain)
    );

    $(".table").append(newRow);

});