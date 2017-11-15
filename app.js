
var firebaseRef = firebase.database().ref();

var applicationHeight;
var applicationRate;
var dilutionRate;
var dropletDiameter;
var rainfall;
var relativeHumidity;
var windSpeed;
var nozzleSize;
var nozzleLength;

function loadSprayDefaults(){

    var db = firebase.database();
    var ref = db.ref('/Defaults/Spray');
    ref.once('value', function(snapshot) {

        windSpeed = snapshot.val().windspeed.low
        rainfall = snapshot.val().rainfall.weak
        nozzleSize = snapshot.val().nozzle.small
        nozzleLength = snapshot.val().nozzle.long
        dilutionRate = snapshot.val().dilutionRate
        relativeHumidity = snapshot.val().relativeHumidity.humid
            applicationRate = snapshot.val().applicationRate
            applicationHeight = snapshot.val().applicationHeight.boonspray

            document.getElementById("low").checked = windSpeed;
            document.getElementById("weak").checked = rainfall;
            document.getElementById("dilutionrate").value = dilutionRate;
            document.getElementById('nozzles').getElementsByTagName('option')[1].selected = 'selected'
            document.getElementById("size").value = nozzleSize;
            document.getElementById("length").value = nozzleLength;
            document.getElementById("humid").checked = relativeHumidity;
            document.getElementById("rate").value = applicationRate;
            document.getElementById("boonSpray").checked = applicationHeight;
            
    })

}

function loadLeafPropDefaults(){

    var db = firebase.database();
    var ref = db.ref('/Defaults/Leaf Properties');
    ref.once('value', function(snapshot) {

        var test = snapshot.val().metabolicRate;

        window.alert(test)



    })

}
