const request = require("request");

const forecast = (lattitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=09ddb835fcac4da6a74b0fc73ced2088&query=" +
    lattitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    //console.log(body.current);
    if (error) {
      callback("Unable to connect, Andrew is gay", undefined);
      //console.log("Unable to connect, Andrew is gay");
    } else if (body.error) {
      callback("Unable to find location", undefined);
      //console.log("Unable to find location");
    } else {
      const temperature = body.current.temperature;
      const feelLikeTemperature = body.current.feelslike;
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          temperature +
          " degrees out. It feels like " +
          feelLikeTemperature +
          " degree, Humidity: " +
          body.current.humidity +
          "%"
      );
    }
  });
};

module.exports = forecast;
