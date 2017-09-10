module.change_code = 1;
'use strict';

var alexa = require('alexa-app');
var app = new alexa.app('test-skill');
var requestpackage = require('request');
var rp = require('request-promise');
var http = require('http');
var Client = require('node-rest-client').Client;

app.launch(function (request, response) {
    response.say('Welcome to Weather Forecasting You want to know about the today forecast').shouldEndSession(false);
});

app.error = function (exception, request, response) {
    console.log(exception)
    console.log(request);
    console.log(response);
    response.say('Sorry an error occured ' + error.message);
};
app.intent('WelcomeIntent', function (request, response) {
    response.say("Welcome to Weather Forecasting do you want to know about today's Monsoon").shouldEndSession(false);
});
app.intent('WeatherIntent', {
    "slots": {
        "cityname": "AMAZON.AT_CITY"
    }
},
    function (request, response) {
        // this.response = response;
        var city = request.slot('cityname');

        if (city) {
            // var options = {
            //     method: 'GET',
            //     uri: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f124bbe4bc06cf62b4dbbc17cb4c0692`,
            //     json: true,
            //     resolveWithFullResponse: true,
            //     // timeout: 160
            // };
            var rescontent = null;
            // var faaHelper = new FAADataHelper();
            // faaHelper.requestStatus(city).then(function (Status) {
            //      console.log(Status.name);
            //       response.say("After timeout!").say(" test ");
            //     //response.say(Status.name);//.send();
            //     // setTimeout(function () {
            //     //     response.say("After timeout!").say(" test ");
            //     //     response.send();
            //     // }, 1000);

            // }).catch(function (err) {
            //     //console.log(err.statusCode);
            //     var prompt = 'I didn\'t have data';
            //     response.say(prompt).shouldEndSession(false).send();
            // });
            // return false;
            var client = new Client();

            // direct way 
            client.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f124bbe4bc06cf62b4dbbc17cb4c0692`, function (data, res) {
                // parsed response body as js object 
                console.log("resut 1" + JSON.stringify(data));
                // raw response 
                //console.log("resut 2" + res);
                let desc = data.weather[0].description;
                let humidity = data.main.humidity;
                let visibility = data.visibility;
                let wind = data.wind.speed;
                let temp = data.main.temp;
                let city = data.name;
                Citydata = `Today weather looks  ${desc}  in  ${city}  with humidity is ${humidity}  temperature is ${temp} visibility is ${visibility} and the wind speed is ${wind} Do you like to continue.`;
                console.log("city result" + Citydata);
                //  console.log("hi.. "+ JSON.stringify(res));
                response.say(`Today weather looks  ${desc}  in  ${city}  with humidity is ${humidity} degrees  temperature is ${temp} degree visibility is ${visibility} and the wind speed is ${wind} Do you like to continue.`);
                // Response.say()
            });

            // registering remote methods 
            // client.registerMethod("jsonMethod", `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f124bbe4bc06cf62b4dbbc17cb4c0692`, "GET");

            // client.methods.jsonMethod(function (data, response) {
            //     // parsed response body as js object 
            //     console.log(data);
            //     // raw response 
            //     console.log(response);
            // });
            // rp(options)
            //     .then(function (res) {
            //         let desc = res.body.weather[0].description;
            //         let humidity = res.body.main.humidity;
            //         let visibility = res.body.visibility;
            //         let wind = res.body.wind.speed;
            //         let temp = res.body.main.temp;
            //         let city = res.body.name;
            //         Citydata = `Today weather looks  ${desc}  in  ${city}  with humidity is ${humidity}  temperature is ${temp} visibility is ${visibility} and the wind speed is ${wind} Do you like to continue.`;

            //         //  console.log("hi.. "+ JSON.stringify(res));
            //         response.say("res.. " + Citydata).send();
            //     })
            //     .catch(function (err) {
            //         var prompt = 'I didn\'t have data';
            //         response.say(prompt).shouldEndSession(false).send();
            //     });
            // var content = requestpackage(options, callback);
            // console.log("willa df adfa df ");
            // GetcityResponse(city, function (error, result) {
            //     //console.log("tttt   " + result)

            //     setTimeout(function () {
            //         rescontent = result;
            //     }, 2000);
            // })
            // console.log(rescontent);
            // setTimeout(function () {
            //     response.say(rescontent);
            // },
            //     3000);


            // var weatherreport = require('./weather')(city);
            //           var result =  requestpackage(options, function (error, res) {
            //                 //var data = JSON.stringify(body);
            //                 //var responseParse = JSON.parse(response);
            //                 //console.log("hai output shown : " + responseParse);
            //                 // let desc = responseParse.body.weather.description;
            //                 let desc = res.body.weather[0].description;
            //                 // response.body.weather.forEach(function(element) {
            //                 //    console.log(JSON.stringify(element));

            //                 // }, this);

            //                // console.log("output " + JSON.stringify(response.body));
            //                 let humidity = res.body.main.humidity;
            //                 let visibility = res.body.visibility;
            //                 let wind = res.body.wind.speed;
            //                 let temp = res.body.main.temp;
            //                // res.write(res.body);
            //                // res.end();
            //                 //response.say("response  ,,,");
            //                // response.say(`Today weather looks  ${desc}  in  ${city}  with humidity is ${humidity}  temperature is ${temp} visibility is ${visibility} and the wind speed is ${wind} Do you like to continue.`).shouldEndSession(false).send();
            //                 // if (error) {
            //                 //     return console.log(error);
            //                 // }
            //                 // console.log(JSON.stringify(response));
            //                 // console.log(data.name);
            //             });
            // console.log(JSON.stringify(result));

            // let desc = weather.description;
            // let humidity = main.humidity;
            // //response.say("Today weather looks " + desc + " in " + city + "with humidity is " + humidity + "Do you like to continue.").shouldEndSession(false);
            // response.say(`Today weather looks  ${desc}  in  ${city}  with humidity is ${humidity}  temperature is ${temp} visibility is ${visibility} and the wind speed is ${wind} Do you like to continue.`).shouldEndSession(false);
        } else {
            response.say("please tell me your city name").shouldEndSession(false);
        }
    });
var Citydata = null;
function GetcityResponse(cities, callback) {
    var options = {
        method: 'GET',
        uri: `http://api.openweathermap.org/data/2.5/weather?q=${cities}&appid=f124bbe4bc06cf62b4dbbc17cb4c0692`,
        json: true
        // timeout: 160
    };

    requestpackage(options, function (error, res, body) {
        // console.log("res in httprequest" + JSON.stringify(res));

        let desc = res.body.weather[0].description;
        let humidity = res.body.main.humidity;
        let visibility = res.body.visibility;
        let wind = res.body.wind.speed;
        let temp = res.body.main.temp;
        let city = res.body.name;
        Citydata = `Today weather looks  ${desc}  in  ${city}  with humidity is ${humidity}  temperature is ${temp} visibility is ${visibility} and the wind speed is ${wind} Do you like to continue.`;

        return callback(null, Citydata);
        //return callback(null,`Today weather looks  ${desc}  in  ${city}  with humidity is ${humidity}  temperature is ${temp} visibility is ${visibility} and the wind speed is ${wind} Do you like to continue.`);
    });
    //console.log("result to test" + JSON.stringify(result));
    // console.log(Citydata);
    // }).end();
    //  return (result);
    // response.say("response  ,,,");
    //return `Today weather looks  ${desc}  in  ${city}  with humidity is ${humidity}  temperature is ${temp} visibility is ${visibility} and the wind speed is ${wind} Do you like to continue.`;
}
app.intent('ThankYouIntent', function (request, response) {
    response.say("Thank you, Namdri and dhanniyavaath");
});
function FAADataHelper() { }

FAADataHelper.prototype.requestStatus = function (city) {
    // body...  
    return this.getStatus(city).then(
        function (response) {
            console.log('success - received airport info for ' + city);
            return response.body;
        }

    );
};

FAADataHelper.prototype.getStatus = function (city) {
    var options = {
        method: 'GET',
        uri: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f124bbe4bc06cf62b4dbbc17cb4c0692`,
        resolveWithFullResponse: true,
        json: true
    };

    return rp(options);
};
module.exports = app;