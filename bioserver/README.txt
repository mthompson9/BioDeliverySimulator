Install
    - Download and install the latest nodejs version (8.9.1)
    - Open a terminal/command window
    - Change to the bioserver/bioapp directory
    - Run "npm install", this will download all the required packages


Run the server
    - Change to the bioserver/bioapp directory
    - To start the server (with debug output) type these commands in the terminal:
        mac:
	        DEBUG=* npm start
        windows
	        set DEBUG=* & npm start

    - In your browser go to: 
            http://localhost:3000

Overview
    Server
        I've used nodejs, and the expressjs sinple web application framework for the server written in javascript.

        Interesting files:
            - \routes\main.js
                - This file is the main entry point for HTTP requests coming into the server. That is for the web services
                (to get the parameters for example), or for serving web pages.

                For the web services, I have a couple examples, there is one to return the default parameters, I've just returned 4 at the moment. And I'm not getting the from a database at the moment. I'm constructing a javsscript object, then converting that into JSON to send back to the client.

                TODO: You will need to add extra default parameters to this list so they are send back to the client. 

                        router.get('/api/getparameters', function(req, res, next) {
                            var paramObj = {
                                "windSpeed": 'medium',
                                "dropletDiameterType": 'nozzle', //the value of the drop down in html
                                "dropletDiameterA": 33,
                                "dropletDiameterB": 22
                            };

                            res.send( JSON.stringify(paramObj))
                        });

            - \views\enterparams.ejs
                - This is the main HTML page for the app, its written in the ejs javascript templating language (http://ejs.co/). It allows you to mix server side javascript and HTML. I've not got any server side javascript in there it's all in the client. Also at the moment I've put the javascript directly into this file. We should put it into a separate javascript file on its own.

                To make it easier to manage I've split each 'tab' or step of the wizard into it's own file. So in the view/tabs directory you will see them all. And In the enterparams file you can see I include the contents of these files into the main file with '<% include tabs/spray %>'. 

    Client
        The client uses bootstrap, and knockoutjs. Knockout is a simple framework that i'm using to bind the html elements (like radio button, text boxes, etc) to a 'ViewModel' that's written in javascript (It's in the enterparams.ejs file, and starts with the line 'function AppViewModel'). Whenever changes are made to the textboxs/radio buttons/etc the changes are immediately reflected in the javascript model. Therefore if someone windspeed a value in the GUI to 3, then in the javascript code you can get that value by typing 'myView.dropletDiameterA()' or set a value in the GUI by something like this: myView.dropletDiameterA('newvalue'). This is called binding. If you look in spray.ejs you will see something like 'data-bind="checked: windSpeed"' on the radio buttons. This binds these radio buttons to the variable named windSpeed in the view. There's a really nice interactive tutorial here: http://learn.knockoutjs.com/

        The loadParametersFromServer function is called at startup, it calls the server, gets the JSON returned, and then updates the viewmodel with the values returned from the server. When the viewmodel is updated, it will update the GUI (as long as you have data-binded the values to the view).

                this.loadParametersFromServer = function() {
                    //call the server
                    this.callServerGetRunResult(function(paramtersAsJsonString) {
                        //alert('debug: get parameters from server:' + JSON.stringify(paramtersAsJsonString));

                        //update the model, and therefore values in the form
                        myView.dropletDiameterA(paramtersAsJsonString.dropletDiameterA);
                        myView.dropletDiameterB(paramtersAsJsonString.dropletDiameterB);
                        myView.dropletDiameterType(paramtersAsJsonString.dropletDiameterType);
                        myView.windSpeed(paramtersAsJsonString.windSpeed);
                    });
                }

    

        