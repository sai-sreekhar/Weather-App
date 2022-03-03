# Description:

**Question 1**: Given the weather data(json file).From the given json data and for the given latitude and longitude,read the dt(date) ,sunrise(time) and sunset(time) values mentioned in the “current” object(refer to the json file) and convert them from epoch format to normal Date and time format and send the response in the following format and finally host your app on heroku 	
{
  status:”success”,
  Data: {
     Dt:””,
     Sunrise_time:””,
     Sunset_time:””,
  }
}

**HTTP Message Type**: GET\
**Note**: Latitude and Longitude are sent as query parameters.
**api endpoint**: https://weather-app-ss1.herokuapp.com/api/v1/results?lat=19.076&lon=72.8777
