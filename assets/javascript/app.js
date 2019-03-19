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

#("#submit").on("click", function (event) {
    event.preventDefault();

    var trnName = $("#train_name").val().trim();
    var destination = $("#dtn").val().trim();
    var first_tt = $("#first_tt").val().trim();
    var freq = $("#freq").val().trim();

    var train = {
        trn: trnName,
        dest: destination,
        start: first_tt,
        frequency: freq
    };

    database.ref().push(train);

    console.log(train.trnName);
    console.log(train.dest);
    console.log(train.start);
    console.log(train.frequency);

    alert("train added");

    $("#train_name").val("");
    $("#dtn").val("");
    $("#first_tt").val("");
    $("#freq").val("");
});