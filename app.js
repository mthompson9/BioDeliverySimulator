
var firebaseRef = firebase.database().ref();

var applicationHeight;
var applicationRate;
var dilutionRate;
var dropletDiameter;
var rainfall;
var relativeHumidity;
var windSpeed;

function loadSprayDefaults(){

    var db = firebase.database();
    var ref = db.ref('/Defaults/Spray');
    ref.once('value', function(snapshot) {

        windSpeed = snapshot.val().windspeed.low
        rainfall = snapshot.val().rainfall.weak
        dilutionRate = snapshot.val().dilutionRate
        relativeHumidity = snapshot.val().relativeHumidity.humid
            applicationRate = snapshot.val().applicationRate
            applicationHeight = snapshot.val().applicationHeight.boonspray
            window.alert(applicationRate)
            window.alert(applicationHeight)

            document.getElementById("low").checked = windSpeed;
            document.getElementById("weak").checked = rainfall;
            document.getElementById("dilutionrate").checked = dilutionRate;
            document.getElementById("humid").checked = relativeHumidity;
            document.getElementById("rate").value = applicationRate;
            document.getElementById("boonSpray").checked = applicationHeight;
            
            


    })



    



}
