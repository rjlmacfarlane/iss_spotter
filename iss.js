/*
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {
  const domain = `https://api.ipify.org?format=json`;
  request(domain, (error, response, body) => {
    if (!error) {
      if (response.statusCode === 200) {
        const data = JSON.parse(body);
        return callback(null, data.ip);
      } else {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        return callback(Error(msg), null);
      }
    } else return callback(error, null);
  });
};

const fetchCoordsByIP = function(callback) {
  const domain = `https://freegeoip.app/json/`;
  request(domain, (error, response, body) => {
    if (!error) {
      if (response.statusCode === 200) {
        const data = JSON.parse(body);
        const coords = { latitude: data.latitude, longitude: data.longitude};
        return callback(null, coords);
      } else {
        const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
    } else callback(error, null);
  });
};
// fetchCoordsByIP();

module.exports = { fetchMyIP, fetchCoordsByIP };