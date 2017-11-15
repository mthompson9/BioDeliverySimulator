
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
            applicationHeight = snapshot.val().applicationHeight.boonspray
            window.alert(applicationRate)
            window.alert(applicationHeight)

            document.getElementById("rate").value = applicationRate;
            document.getElementById("boonSpray").checked = applicationHeight;
            
            


    })



    



}
