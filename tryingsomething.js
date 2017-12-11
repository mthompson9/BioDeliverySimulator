
var buttonclick = document.getElementById("exportCSV");
s


//~~~~~~~~Variables used at Spray.html~~~~~~~~
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var applicationHeight;
var applicationRate;
var dilutionRate;
var dropletDiameter;
var rainfall;
var relativeHumidity;
var windSpeed;
var nozzleSize;
var nozzleLength;

//~~~~~~~~Variables used at Leaf Properties.html~~~~~~~~
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var surfaceMorphology;
var cuticularThickness;
var tissueThickness;
var coefficientCuticular;
var coefficientTissue;
var metabolism;
var ester2acids;

//~~~~~~~~Variables used at Droplet Properties.html~~~~~~~~
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var diffusionCoefficent;
var surfaceTensionLiquidVapour;
var dropletDynamicViscocity;
var density;
var logP;

//~~~~~~~~Variables used at AI.html~~~~~~~~
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var molarMass;
var partialPressure;
var waterSolubility;

//-NOTE---These are the loss process rates-!
var volatility;
var chemicalStability;
var photostability;
var crystallisation;
var dissolution;

//~~~~~~~~Variables used at Time Points.html~~~~~~~~
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var hours;
var minutes;
var seconds;



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

        surfaceMorphology = snapshot.val().surfaceMorphology
        cuticularThickness = snapshot.val().cuticularthickness
        tissueThickness = snapshot.val().tissuethickness
        coefficientCuticular = snapshot.val().diffusionCoefficientCL
        coefficientTissue = snapshot.val().diffusionCoefficientLT
        metabolism = snapshot.val().metabolicRate.secondorder
        ester2acids = snapshot.val().ester2acids.yes

        document.getElementById("angle").value = surfaceMorphology;
        document.getElementById("cuticular").value = cuticularThickness;
        document.getElementById("tissue").value = tissueThickness;
        document.getElementById("coefficientcuticular").value = coefficientCuticular;
        document.getElementById("coefficienttissue").value = coefficientTissue;
        document.getElementById("metabolism").value = metabolism;
        document.getElementById('metabolicrate').getElementsByTagName('option')[3].selected = 'selected'
        document.getElementById("ester2acidsYes").checked = ester2acids;

    })

}

function loadDropletPropDefaults(){

    var db = firebase.database();
    var ref = db.ref('/Defaults/Droplet Properties');
    ref.once('value', function(snapshot) {

        diffusionCoefficent = snapshot.val().diffusionCoefficent
        surfaceTensionLiquidVapour = snapshot.val().surfaceTensionLiquidVapour
        dropletDynamicViscocity = snapshot.val().dropletDynamicViscocity
        density = snapshot.val().density
        logP = snapshot.val().logP

        document.getElementById("diffCo").value = diffusionCoefficent;
        document.getElementById("surfTenLV").value = surfaceTensionLiquidVapour;
        document.getElementById("dropDV").value = dropletDynamicViscocity;
        document.getElementById("den").value = density;
        document.getElementById("logP").value = logP;


    })

}

function loadAIDefaults() {

    var db = firebase.database();
    var ref = db.ref('/Defaults/AI');
    ref.once('value', function(snapshot) {

        molarMass = snapshot.val().molarmass
        partialPressure = snapshot.val().partialPressure
        waterSolubility = snapshot.val().waterSolubility
        volatility = snapshot.val().volatility
        chemicalStability = snapshot.val().chemicalStability
        photostability = snapshot.val().photostability
        crystallisation = snapshot.val().crystallisation
        dissolution = snapshot.val().dissolution
    
        document.getElementById("molarmass").value = molarMass;
        document.getElementById("partialpressure").value = partialPressure;
        document.getElementById("watersolubility").value = waterSolubility;
        document.getElementById("volatility").value = volatility;
        document.getElementById("chemicalstability").value = chemicalStability;
        document.getElementById("photostability").value = photostability;
        document.getElementById("crystallisation").value = crystallisation;
        document.getElementById("dissolution").value = dissolution;

    })

}

function loadTimePointDefaults() {
    
    var db = firebase.database();
    var ref = db.ref('/Defaults/Time Points');
    ref.once('value', function(snapshot) {

        hours = snapshot.val().firstentry.hours;
        minutes = snapshot.val().firstentry.minutes;
        seconds = snapshot.val().firstentry.seconds;

        document.getElementById("hours").value = hours;
        document.getElementById("minutes").value = minutes;
        document.getElementById("seconds").value = seconds;


    })

}

function updateCurrentSim() {
    window.alert("I've been triggered successfully")

    var db = firebase.database();
    var ref = db.ref('/Current Simulation/');
    var usersRef = ref.child('Current Sim');
    ref.once('value', function(snapshot) {

        var pageTitle = document.getElementById("sl").value


        if (pageTitle == 'Spray') {
            usersRef.update({
            Spray: {            //this is where we specify which page we're updating 
            WindSpeed: (document.getElementById("angle").value),         //the update node and new value. 
            Rain: (document.getElementById("angle").value),       //close spray page with }, and then address your next page. 
            DropletDiameter: (document.getElementById("nozzles").value),               //swap out 101 with document.getelement etc etc 
            ApplicationHeight: (document.getElementById("angle").value),
            ApplicationRate: (document.getElementById("angle").value),
            DilutionRate: (document.getElementById("angle").value) }})
    }   else if (pageTitle == 'Leaf Properties') {
            usersRef.update({                   //If .update doesn't work then go back to set
                Leaf_Properties: { 
                    SurfaceMorphology: (document.getElementById("angle").value),
                    CuticularThickness: (document.getElementById("cuticular").value),
                    TissueThickness: (document.getElementById("tissue").value),
                    CoefficientCuticular: (document.getElementById("coefficientcuticular").value),
                    CoefficientTissue: (document.getElementById("coefficienttissue").value), }})
                    window.location.href = "Droplet Properties.html";
    }   else if (pageTitle == 'Droplet Properties') { 
            usersRef.update({
                DropletProperties: { 
                    DiffusionCoefficient: (document.getElementById('diffCo').value), 
                    SurfaceTension: (document.getElementById('surfTenLV').value), 
                    DropletDynamicViscocity: (document.getElementById('dropDV').value),
                    Density: (document.getElementById('den').value),
                    LogP: (document.getElementById('logP').value)}})
                    window.location.href = "AI.html";
     }  else if (pageTitle == 'AI') {
            usersRef.update({
                AI: {
                    MolarMass: (document.getElementById('molarmass').value),
                    PartialPressure: (document.getElementById('partialpressure').value),
                    SolubilityInWater: (document.getElementById('watersolubility').value),
                    VolatilityRate: (document.getElementById('volatility').value),
                    Chemimcalstability: (document.getElementById('chemicalstability').value),
                    Photostability: (document.getElementById('photostability').value),
                    CrystallisationRate: (document.getElementById('crystallisation').value),
                    DisolutionRate: (document.getElementById('dissolution').value)}})
                    window.location.href = "Time Points.html";
    }   else if (pageTitle == 'Time Points') {
            usersRef.update({
                TimePoints: {
                    1: {
                        Hours: (document.getElementById('hours').value),
                        Mins: (document.getElementById('mins').value),
                        Secs: (document.getElementById('secs').value),
                    }

                }})
            } else {
                window.alert('Page title is missing')
            }

        window.alert("Triggered Successfully")
        

    })

    
}



var firebaseRef = firebase.database().ref();



function newSimulation() { 
    window.alert("I've been triggered successfully")

    var db = firebase.database();
    var ref = db.ref('/Current Simulation/');
    var usersRef = ref.child('New Sim');
    var newSimTitle = document.getElementById("example").value          //assumes the start button has id of example

    ref.usersRef.push({
        Spray: {
            WindSpeed: ('0'),
            Rain: ('0'),
            DropletDiameter: ('0'),
            ApplicationHeight: ('0'),
            ApplicationRate: ('0'),
            DilutionRate: ('0')
            },
        LeafProperties: {
            SurfaceMorphology: ('0'),
            CuticularThickness: ('0'),
            TissueThickness: ('0'),
            CoefficientCuticular: ('0'),
            CoefficientTissue: ('0')
        },
        DropletProperties: {
            DiffusionCoefficient: ('0'),
            SurfaceTension: ('0'),
            DropletDynamicViscocity: ('0'),
            Density: ('0'),
            LogP: ('0')
        },
        AI:{
            MolarMass: ('0'),
            PartialPressure: ('0'),
            SolubilityInWater: ('0'),
            VolatilityRate: ('0'),
            ChemicalStability: ('0'),
            Photostability: ('0'),
            CrystallisationRate: ('0'),
            DisolutionRate: ('0')
        },
        TimePoints: {
            Hours: ('0'),
            Mins: ('0'),
            Secs: ('0')
        },
        Output: {
            placeholder: ('0')
        },
        HeatmapValues: {
            Placeholder: ('0')
        }
    })
 }







