var buttonclick = document.getElementById("tester");
var firebaseRef = firebase.database().ref();

var applicationHeight;
var applicationRate;
var dilutionRate;
var dropletDiameter;
var rainfall;
var relativeHumidity;
var windSpeed;

function loadDefaults(){


    var db = firebase.database();
    var ref = db.ref('/Defaults/Spray');
    ref.once('value', function(snapshot) {


            applicationRate = snapshot.val().appRate
            window.alert(applicationRate)
            document.getElementById("rate").value = applicationRate;
            


    })



    



}