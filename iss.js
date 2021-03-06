/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require("request");
const fetchMyIP = function(callback) {
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);
    const ip = data["ip"];
    // console.log(`typeof ip: `, typeof ip);
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    const location = {};
    location["latitude"] = data["latitude"];
    location["longitude"] = data["longitude"];
    callback(null, location);
  });
};

const fetchISSFlyoverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}lon=${coords.longitude}`, (error, response,body) => {
    if (error) {
      callback(error, null);
      return;
    }
  
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  
    const pass = JSON.parse(body).response;
    callback(null, passes);

  });
};

const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {

    if (error) {
      callback(error, null);
      return;
    }

    fetchCoordsByIP(ip, (error, location) => {
      if (error) {
        callback(error, null);
        return;
      }

      fetchISSFlyoverTimes(location, (error, coordinates) => {
        if (error) {
          callback(error, null);
          return;
        }

        callback(null, passes);
      });
    });
  });
};



//for other file use, do not remove
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyoverTimes, nextISSTimesForMyLocation };
