module.change_code = 1;
'use strict';

var alexa = require('alexa-app');
var app = new alexa.app('test-skill');
var requestpackage = require('request');
var rp = require('request-promise');
var http = require('http');

app.launch(function (request, response) {
    response.say('Welcome to Weather Forecasting').reprompt('You want to know about the today forecast').shouldEndSession(false).remprompt('I\'m still listening.');
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
        this.response = response;
        var city = request.slot('cityname');

        if (city) {
            var options = {
                method: 'GET',
                uri: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f124bbe4bc06cf62b4dbbc17cb4c0692`,
                json: true
                // timeout: 160
            };
            var rescontent = null;
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
          var result =  requestpackage(options, function (error, res) {
                //var data = JSON.stringify(body);
                //var responseParse = JSON.parse(response);
                //console.log("hai output shown : " + responseParse);
                // let desc = responseParse.body.weather.description;
                let desc = res.body.weather[0].description;
                // response.body.weather.forEach(function(element) {
                //    console.log(JSON.stringify(element));

                // }, this);

               // console.log("output " + JSON.stringify(response.body));
                let humidity = res.body.main.humidity;
                let visibility = res.body.visibility;
                let wind = res.body.wind.speed;
                let temp = res.body.main.temp;
               // res.write(res.body);
               // res.end();
                //response.say("response  ,,,");
               // response.say(`Today weather looks  ${desc}  in  ${city}  with humidity is ${humidity}  temperature is ${temp} visibility is ${visibility} and the wind speed is ${wind} Do you like to continue.`).shouldEndSession(false).send();
                // if (error) {
                //     return console.log(error);
                // }
                // console.log(JSON.stringify(response));
                // console.log(data.name);
            });
console.log(JSON.stringify(result));

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

module.exports = app;