var express = require("express")
var fs = require('fs');

var app = express()
var bodyParser = require("body-parser");
app.use(bodyParser.json());

// var HTTP_PORT = process.env.PORT || 3000
var HTTP_PORT = 8000;


// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT));
});

app.get("/api/v1/results", (req, res, next) => {
    var weatherDataObj;
    try {   
        weatherDataObj = JSON.parse(fs.readFileSync('weatherData.json', 'utf8'));
    } catch (error) {
        console.log('error exception while reading file, err= ',error);
        res.status(404).send({reason:'File not found'});
        return;
    }

    var latitude = req.query.lat;
    var longitude = req.query.lon;

    if ((weatherDataObj.lat == latitude)&&(weatherDataObj.lon == longitude)){
        var epochTime = weatherDataObj.current.dt;
        var date = new Date(epochTime * 1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var epochSunrise = weatherDataObj.current.sunrise;
        var sunriseTime = new Date(epochSunrise * 1000);
        var sunriseHours = sunriseTime.getHours();
        var sunriseMinutes = sunriseTime.getMinutes();
        var sunriseSeconds = sunriseTime.getSeconds();

        var epochSunset = weatherDataObj.current.sunset;
        var sunsetTime = new Date(epochSunset * 1000);
        var sunsetHours = sunsetTime.getHours();
        var sunsetMinutes = sunsetTime.getMinutes();
        var sunsetSeconds = sunsetTime.getSeconds();


        normalTime = year + "-" + month + "-" + day;
        sunrise_time = sunriseHours + ":" + sunriseMinutes + ":" + sunriseSeconds;
        sunset_time = sunsetHours + ":" + sunsetMinutes + ":" + sunsetSeconds;
        res.send({'status':'success','Dt':normalTime,'Sunrise_time':sunrise_time, 'Sunset_time':sunset_time});
        return;
    }
    
    res.status(404).send({reason:'Latitude or Longitude not Found'});
});

