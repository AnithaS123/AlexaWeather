module.change_code = 1;
'use strict';

var alexa = require('alexa-app');
var app = new alexa.app('test-skill');
const request = require('request');
var rp = require('request-promise');


app.launch(function (request, response) {
    response.say('Welcome to Weather Forecasting do you want to know about todays Monsoon').shouldEndSession(false);
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
app.intent('WeatherIntent',
    function (request, response) {
        var city = request.slot('cityname');

        if (city) {
            var options = {
                uri: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f124bbe4bc06cf62b4dbbc17cb4c0692`,
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            };
            rp(options).then(function (repos) {
                console.log('user has %d repos', repos.length);
                let desc = repos.weather.description;
                let humidity = repos.main.humidity;
                let visibility = repos.googleMapResults.visibility;
                let wind = repos.googleMapResults.wind.speed;
                response.say(`Today weather looks  ${desc}  in  ${city}  with humidity is ${humidity}  temperature is ${temp} visibility is ${visibility} and the wind speed is ${wind} Do you like to continue.`).shouldEndSession(false);

            }).catch(function (err) {
                console.log("api called failed");
            });
            // let desc = weather.description;
            // let humidity = main.humidity;
            // let visibility = googleMapResults.visibility;
            // let wind = googleMapResults.wind.speed;
            //response.say("Today weather looks " + desc + " in " + city + "with humidity is " + humidity + "Do you like to continue.").shouldEndSession(false);
            // response.say(`Today weather looks  ${desc}  in  ${city}  with humidity is ${humidity}  temperature is ${temp} visibility is ${visibility} and the wind speed is ${wind} Do you like to continue.`).shouldEndSession(false);
        } else {
            response.say("please tell me your city name").shouldEndSession(false);
        }
    });


app.intent('ThankYouIntent', function (request, response) {
    response.say("Thank you, Namdri and dhanniyavaath");
});

module.exports = app;