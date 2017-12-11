var buttonclick = document.getElementById("exportCSV");
var firebaseRef = firebase.database().ref();

var config = {
    apiKey: "AIzaSyCHBinUqUn2Xnt4FQZHeivt_6UXX-5SX1M",
    authDomain: "bio-sim.firebaseapp.com",
    databaseURL: "https://bio-sim.firebaseio.com",
    projectId: "bio-sim",
    storageBucket: "bio-sim.appspot.com",
    messagingSenderId: "1069672537767"
  };
  firebase.initializeApp(config);

var currentSimName = sessionStorage.getElementById('Sim Name')


//~~~~~~~~Variables used at Spray.html~~~~~~~~
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var applicationHeight;
var applicationRate;
var sprayVolume;
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
//var ester2acids;

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
        //nozzleLength = snapshot.val().nozzle.long
        sprayVolume = snapshot.val().sprayVolume
        relativeHumidity = snapshot.val().relativeHumidity.humid
        applicationRate = snapshot.val().applicationRate
        applicationHeight = snapshot.val().applicationHeight.boonspray

        document.getElementById("low").checked = windSpeed;
        document.getElementById("weak").checked = rainfall;
        document.getElementById("sprayVolume").value = sprayVolume;
        document.getElementById('nozzles').getElementsByTagName('option')[1].selected = 'selected'
        document.getElementById("size").placeholder = nozzleSize;
        //document.getElementById("length").placeholder = nozzleLength;
        document.getElementById("humid").checked = relativeHumidity;
        document.getElementById("rate").placeholder = applicationRate;
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
        //ester2acids = snapshot.val().ester2acids.yes

        document.getElementById("angle").placeholder = surfaceMorphology;
        document.getElementById("cuticular").placeholder = cuticularThickness;
        document.getElementById("tissue").placeholder = tissueThickness;
        document.getElementById("coefficientcuticular").placeholder = coefficientCuticular;
        document.getElementById("coefficienttissue").placeholder = coefficientTissue;
        document.getElementById("metabolism").placeholder = metabolism;
        document.getElementById('metabolicrate').getElementsByTagName('option')[3].selected = 'selected'
        //document.getElementById("ester2acidsYes").checked = ester2acids;

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

        document.getElementById("diffCo").placeholder = diffusionCoefficent;
        document.getElementById("surfTenLV").placeholder = surfaceTensionLiquidVapour;
        document.getElementById("dropDV").placeholder = dropletDynamicViscocity;
        document.getElementById("den").placeholder = density;
        document.getElementById("logP").placeholder = logP;


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
    
        document.getElementById("molarmass").placeholder = molarMass;
        document.getElementById("partialpressure").placeholder = partialPressure;
        document.getElementById("watersolubility").placeholder = waterSolubility;
        document.getElementById("volatility").placeholder = volatility;
        document.getElementById("chemicalstability").placeholder = chemicalStability;
        document.getElementById("photostability").placeholder = photostability;
        document.getElementById("crystallisation").placeholder = crystallisation;
        document.getElementById("dissolution").placeholder = dissolution;

    })

}

function loadTimePointsDefaults() {
    
    var db = firebase.database();
    var ref = db.ref('/Defaults/Time Points');
    ref.once('value', function(snapshot) {

        hours = snapshot.val().firstentry.hours;
        minutes = snapshot.val().firstentry.minutes;
        seconds = snapshot.val().firstentry.seconds;

        document.getElementById("hours").placeholder = hours;
        document.getElementById("mins").placeholder = minutes;
        document.getElementById("secs").placeholder = seconds;


    })

}

function updateProfileSim() {
    // window.alert("I've been triggered successfully")
    var namer = sessionStorage.getItem('Simulation Name')

    var db = firebase.database();
    var ref = db.ref('/Current Simulation/' );
    var usersRef = ref.child(namer);
    ref.once('value', function(snapshot) {

        var pageTitle = sessionStorage.getItem("pagetitle")

        if (pageTitle == 'Spray') {
            usersRef.update({
            Spray: {            //this is where we specify which page we're updating 
            Wind_Speed: (document.getElementById("low").value),          //the update node and new value. 
            Rain: (document.getElementById("weak").value),       //close spray page with }, and then address your next page. 
            DropletDiameter : (document.getElementById('nozzles').getElementsByTagName('option')[1].value),
            NozzleSize : (document.getElementById("size").value),
            //NozzleLength : (document.getElementById("length").value),
            RelativeHumidity : (document.getElementById("humid").value),
            ApplicationHeight: (document.getElementById("boonSpray").value),
            ApplicationRate: (document.getElementById("rate").value), 
            DilutionRate: (document.getElementById("sprayVolume").value) }})
            ref.child('Load_Custom_Entry').update ({
                User_Spray : ("1")
            })
            window.location.href = "Leaf Properties.html";
    }   else if (pageTitle == 'Leaf Properties') {
            usersRef.update({                   //If .update doesn't work then go back to set
                Leaf_Properties: { 
                    surfaceMorphology: (document.getElementById("angle").value),
                    cuticularThickness: (document.getElementById("cuticular").value),
                    tissueThickness: (document.getElementById("tissue").value),
                    coefficientCuticular: (document.getElementById("coefficientcuticular").value),
                    coefficientTissue: (document.getElementById("coefficienttissue").value), }})
                    ref.child('Load_Custom_Entry').update ({
                        User_Leaf : ("1")
                    })
                    window.location.href = "Droplet Properties.html";
    }   else if (pageTitle == 'Droplet Properties') { 
            usersRef.update({
                Droplet_Properties: { 
                    DiffusionCoefficient: (document.getElementById("diffCo").value), 
                    SurfaceTension: (document.getElementById("surfTenLV").value), 
                    DropletDynamic_Viscocity: (document.getElementById("dropDV").value),
                    Density: ( document.getElementById("den").value),
                    Log_P: (document.getElementById("logP").value)}})
                    ref.child('Load_Custom_Entry').update ({
                        User_Droplet : ("1")
                    })
                    window.location.href = "AI.html";
     }  else if (pageTitle == 'AI') {
            usersRef.update({
                AI: {
                    MolarMass: (document.getElementById("molarmass").value),
                    PartialPressure: (document.getElementById("partialpressure").value),
                    SolubilityInWater: (document.getElementById("watersolubility").value),
                    VolatilityRate: (document.getElementById("volatility").value),
                    Chemicalstability: (document.getElementById("chemicalstability").value),
                    Photostability: ( document.getElementById("photostability").value),
                    CrystalisationRate: (document.getElementById("crystallisation").value),
                    DissolutionRate: ( document.getElementById("dissolution").value)}})
                    ref.child('Load_Custom_Entry').update ({
                        User_AI : ("1")
                    })
                    window.location.href = "Time Points.html";
    }   else if (pageTitle == 'Time Points') {
            usersRef.update({
                Time_Points: {
                    1: {
                        Hours: (document.getElementById("hours").value),
                        Minutes: (document.getElementById("mins").value),
                        Seconds: (document.getElementById("secs").value)
                        
                    }
                    

                }})
                ref.child('Load_Custom_Entry').update ({
                    User_TP : ("1")
                })
                window.location.href = "Accordian.html";
            } else {
                window.alert('Page title is missing')
            }

        // window.alert("Triggered Successfully")
        

    })}

    function updateCurrentSim(currentSimName) {
        // window.alert("I've been triggered successfully")
    
        var db = firebase.database();
        var ref = db.ref('/Current Simulation/');
        var usersRef = ref.child(currentSimName);
        ref.once('value', function(snapshot) {
    
            var pageTitle = document.getElementById("pagetitle").value
    
            if (pageTitle == 'Spray') {
                usersRef.update({
                Spray: {            //this is where we specify which page we're updating 
                WindSpeed: (document.getElementById("low").value),          //the update node and new value. 
                Rain: (document.getElementById("weak").value),       //close spray page with }, and then address your next page. 
                DropletDiameter_Nozzle_Selected : (document.getElementById('nozzles').getElementsByTagName('option')[1].value),
                NozzleSize : (document.getElementById("size").value),
                //NozzleLength : (document.getElementById("length").value),
                RelativeHumidity : (document.getElementById("humid").value),
                ApplicationHeight: (document.getElementById("boonSpray").value),
                ApplicationRate: (document.getElementById("rate").value), 
                DilutionRate: (document.getElementById("sprayVolume").value) }})
                ref.child('Load_Custom_Entry').update ({
                    User_Spray : ("1")
                })
                window.location.href = "Leaf Properties.html";
        }   else if (pageTitle == 'Leaf Properties') {
                usersRef.update({                   //If .update doesn't work then go back to set
                    Leaf_Properties: { 
                        surfaceMorphology: (document.getElementById("angle").value),
                        cuticularThickness: (document.getElementById("cuticular").value),
                        tissueThickness: (document.getElementById("tissue").value),
                        coefficientCuticular: (document.getElementById("coefficientcuticular").value),
                        coefficientTissue: (document.getElementById("coefficienttissue").value), }})
                        ref.child('Load_Custom_Entry').update ({
                            User_Leaf : ("1")
                        })
                        window.location.href = "Droplet Properties.html";
        }   else if (pageTitle == 'Droplet Properties') { 
                usersRef.update({
                    Droplet_Properties: { 
                        DiffusionCoefficient: (document.getElementById("diffCo").value), 
                        SurfaceTension: (document.getElementById("surfTenLV").value), 
                        DropletDynamicViscocity: (document.getElementById("dropDV").value),
                        Density: ( document.getElementById("den").value),
                        LogP: (document.getElementById("logP").value)}})
                        ref.child('Load_Custom_Entry').update ({
                            User_Droplet : ("1")
                        })
                        window.location.href = "AI.html";
         }  else if (pageTitle == 'AI') {
                usersRef.update({
                    AI: {
                        MolarMass: (document.getElementById("molarmass").value),
                        PartialPressure: (document.getElementById("partialpressure").value),
                        SolubilityInWater: (document.getElementById("watersolubility").value),
                        VolatilityRate: (document.getElementById("volatility").value),
                        ChemicalStability: (document.getElementById("chemicalstability").value),
                        Photostability: ( document.getElementById("photostability").value),
                        Crystalisation_Rate: (document.getElementById("crystallisation").value),
                        DissolutionRate: ( document.getElementById("dissolution").value),
                        Procide: ( document.getElementById('procide').value)}})
                        ref.child('Load_Custom_Entry').update ({
                            User_AI : ("1")
                        })
                        window.location.href = "Time Points.html";
        }   else if (pageTitle == 'Time Points') {
                usersRef.update({
                    Time_Points: {
                        1: {
                            Hours: (document.getElementById("hours").value),
                            Minutes: (document.getElementById("mins").value),
                            Seconds: (document.getElementById("secs").value)
                            
                        }
                        
    
                    }})
                    ref.child('Load_Custom_Entry').update ({
                        User_TP : ("1")
                    })
                    window.location.href = "Accordian.html";
                } else {
                    window.alert('Page title is missing - please restart. You can load this profile up until this point.')
                }
    
            // window.alert("Triggered Successfully")
            
    
        })}

    function pullCurrentProfile () {

         var namer = sessionStorage.getItem('Simulation Name')
         var db = firebase.database();
            
         var refPath = ('/Current Simulation/' + namer + '/Spray/')

            // window.alert(namer);
            // window.alert(refPath);
        
            var ref = db.ref(refPath);
            ref.once('value', function(snapshot) {
                var here = snapshot.val()
                //~~~~~~~~~~~~Spray Values~~~~~~~~~~~~~
                //      ~~~~~~~~~~~~~~~~~~~~~~~~~   
                // window.alert(here.Spray)
                // window.alert(here.Spray.Application_Height)
                applicationHeight = here.Spray.ApplicationHeight;
                window.alert('App Height = ' + applicationHeight)
                applicationRate = here.Spray.ApplicationRate
                sprayVolume =  here.Spray.sprayVolume
                dropletDiameter = here.Spray.DropletDiameter
                rainfall = here.Spray.Rain
                relativeHumidity = here.Spray.RelativeHumidity
                windSpeed = here.Spray.WindSpeed
                // nozzleSize = here.Spray.NozzleSize
                // nozzleLength = here.Spray.NozzleLength
                // ~~~~~~~~~~~~Leaf Values~~~~~~~~~~~~~
                //      ~~~~~~~~~~~~~~~~~~~~~~~~~
                surfaceMorphology = here.Leaf_Properties.SurfaceMorphology
                cuticularThickness = here.Leaf_Properties.cuticularThickness
                tissueThickness = here.Leaf_Properties.tissueThickness
                coefficientCuticular = here.Leaf_Properties.coefficientCuticular
                coefficientTissue = here.Leaf_Properties.coefficientTissue
                // metabolism = here.LeafProperties.metabolism
                // ester2acids = here.LeafProperties.ester2acids
                //~~~~~~~~~~~~Drop Values~~~~~~~~~~~~~
                //      ~~~~~~~~~~~~~~~~~~~~~~~~~
                diffusionCoefficent = here.Droplet_Properties.DiffusionCoefficient
                surfaceTensionLiquidVapour = here.Droplet_Properties.SurfaceTension
                dropletDynamicViscocity = here.Droplet_Properties.dropletDynamicViscocity
                density = here.Droplet_Properties.Density
                logP = here.Droplet_Properties.LogP
                //~~~~~~~~~~~~AI Values~~~~~~~~~~~~~
                //      ~~~~~~~~~~~~~~~~~~~~~~~~~
                molarMass = here.AI.MolarMass
                partialPressure = here.AI.PartialPressure
                waterSolubility = here.AI.SolubilityInWater
                chemicalStability = here.AI.ChemicalStability
                crystallisation = here.AI.CrystalisationRate
                dissolution = here.AI.DissolutionRate
                volatility = here.AI.VolatilityRate
                // window.alert('Set in the func' + applicationHeight)
                document.getElementById("aapph").value = applicationHeight

                // ~~~~~~~~~~~~Time point Values~~~~~~~~~~~~~
                //      ~~~~~~~~~~~~~~~~~~~~~~~~~
                refPath = (refPath + 'TimePoints/')
                ref = db.ref('/Current Simulation/Current Sim/TimePoints/');
                snapshot.forEach(function(childSnapshot){ 
                    here = snapshot.val()
                    hours = here.Hours,
                    mins = here.Mins, 
                    secs = here.Secs
                   
                })
                
                console.log("Spray: " + (applicationHeight) + ', ' + (applicationRate) + ', ' + (sprayVolume) + ', ' + (dropletDiameter) + ', ' + (rainfall) + ', ' + (relativeHumidity) + ', ' + (windSpeed) + ', ' + (nozzleSize))
                });
        
            // sessionStorage.setItem('Sim Name', simName)
            // console.log((sessionStorage.getItem('Sim Name')))

           
                
        }

    function newSimulation(simName) { 
        sessionStorage.setItem('Simulation Name', simName)

    
        var db = firebase.database();
        var ref = db.ref('/Current Simulation/' );
        var usersRef = ref.child(simName);
        ref.once('value', function(snapshot) {
    
        usersRef.update({
            Spray: {
                WindSpeed: ("0"),
                Rain: ("0"),
                DropletDiameter: ("0"),
                ApplicationHeight: ("0"),
                ApplicationRate: ("0"),
                sprayVolume: ('0'),
                RelativeHumidity: ('0')
                },
            Leaf_Properties: {
                SurfaceMorphology: ("0"),
                CuticularThickness: ("0"),
                TissueThickness: ("0"),
                CoefficientCuticular: ("0"),
                CoefficientTissue: ("0")
            },
            Droplet_Properties: {
                DiffusionCoefficient: ("0"),
                SurfaceTension: ("0"),
                DropletDynamicViscocity: ("0"),
                Density: ("0"),
                LogP: ("0")
            },
            AI:{
                MolarMass: ("0"),
                PartialPressure: ("0"),
                SolubilityInWater: ("0"),
                VolatilityRate: ("0"),
                ChemicalStability: ("0"),
                Photostability: ("0"),
                CrystallisationRate: ("0"),
                DisolutionRate: ("0"),
                FormulationType: ('0'),
                Procide: ('false')
            },
            TimePoints: {
                Hours: ("0"),
                Mins: ("0"),
                Secs: ("0")
            },
            Output: {
                Placeholder: ("0")
            },
            HeatmapValues: {
                Placeholder: ("0")
            }
           
        })
        ref.child('Load_Custom_Entry').update ({
            User_Spray : ("0"),
            User_Leaf : ("0"),
            User_Droplet : ("0"),
            User_AI : ("0"),
            User_TP : ("0")
        })

        window.location.href = "Spray.html";
     }

    )}

    function callPython(toPythonSimTitle) {
        
                var url = "https://mthompson9.pythonanywhere.com/";
                var method = "POST";
                var postData = String(toPythonSimTitle);
                
                // You REALLY want shouldBeAsync = true.
                // Otherwise, it'll block ALL execution waiting for server response.
                var shouldBeAsync = true;
                
                var request = new XMLHttpRequest();
                
                // Before we send anything, we first have to say what we will do when the
                // server responds. This seems backwards (say how we'll respond before we send
                // the request? huh?), but that's how Javascript works.
                // This function attached to the XMLHttpRequest "onload" property specifies how
                // the HTTP response will be handled. 
                request.onload = function () {
                
                   // Because of javascript's fabulous closure concept, the XMLHttpRequest "request"
                   // object declared above is available in this function even though this function
                   // executes long after the request is sent and long after this function is
                   // instantiated. This fact is CRUCIAL to the workings of XHR in ordinary
                   // applications.
                
                   // You can get all kinds of information about the HTTP response.
                   var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
                   var data = request.responseText; // Returned data, e.g., an HTML document.
                }
                
                request.open(method, url, shouldBeAsync);
                
                request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
                // Or... request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
                // Or... whatever
                
                // Actually sends the request to the server.
                request.send(postData);  
            
            }
    

 (function () {


           //GET ELEMENTS

           const preObject = document.getElementById('object');
           const ulList = document.getElementById('list');

           //Create refernces
           const dbRefObject = firebase.database().ref().child('Current Simulation');
           const dbRefList = dbRefObject.child('currentSim/output')

           //sync object changes
           dbRefList.on('value', snap => {
             preObject.innerText = JSON.stringify(snap.val(),null,3);

             var ourDbObject = snap.val();

             //     self.rows = [
             //       [10,2,3,4],
             //       [30,2,3,4],
             //       [50,2,3,4],
             //       [70,2,3,4],
             //       [90,2,3,4],
             //     ];

             var outputArray = [];
             Object.keys(ourDbObject).forEach(function(key){
               if (key.startsWith("col")) {
                 outputArray.push(ourDbObject[key]);
               }
             });

             console.log(outputArray);

           });
   //sync list changes -- listens when a child has been added
   dbRefList.on('child_added', snap => {

     const li = document.createElement('li');
     li.innerText = snap.val();
     li.id = snap.key;// add key name to each item
     ulList.appendChild(li);

   //only gets called when children have been changed
     dbRefList.on('child_changed', snap => {

       const liChanged = document.getElementById(snap.key);//key will corresepond to that specific key value when it has been updated
       liChanged.innerText = snap.val();


     });

     //only gets called when children have been removed
       dbRefList.on('child_removed', snap => {

         const liToRemove = document.getElementById(snap.key);//key will corresepond to that specific key value when it has been remo
         liToRemove.remove();


       });


   });

   itemsRef.on('value', function(snapshot) {
       snapshot.forEach(function(child) {
           createHeaders(child.val());
           showItems(child.val(), child.key);
       });
   });


   }());

   

    




