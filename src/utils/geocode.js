const request = require("request");

const geocode = (address, callback) => {
  const faszomURL =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoicm9iaS1mYXN6b21iYSIsImEiOiJja3M3a3hxMXEwODBiMm5sdTJhcThhYTVjIn0.v9yttlwy5Um4CxWEwbFpvA&limit=1";
  request({ url: faszomURL, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to faszom", undefined);
    } else if (!body.features.length) {
      callback("Egy nevet sem tudsz megadni rendesen", undefined);
    } else {
      const lattitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      // console.log(lattitude, longitude);

      callback(undefined, {
        lattitude,
        longitude,
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
