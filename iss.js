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

const fetchCoordsByIP = function(ip, callback) {
  const domain = `https://freegeoip.app/json/`;
  request(domain, (error, response, body) => {
    if (!error) {
      if (response.statusCode === 200) {
        const data = JSON.parse(body);
        const coords = { latitude: data.latitude, longitude: data.longitude};
        return callback(null, coords);
      } else {
        const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
        return callback(Error(msg), null);
      }
    } else return callback(error, null);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (!error) {
      if (response.statusCode === 200) {
        const passTimes = JSON.parse(body).response;
        return callback(null, passTimes);
      } else {
        const msg = `Status Code ${response.statusCode} when fetching data. Response: ${body}`;
        return callback(Error(msg), null);
      }
    } else return callback(error, null);
  });
};
// fetchISSFlyOverTimes({ latitude: 37.751, longitude: -97.822 });

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (!error) {
      fetchCoordsByIP(ip, (error, coords) => {
        if (!error) {
          fetchISSFlyOverTimes(coords, (error, passTimes) => {
            if (error) {
              return callback(error, null);
            } callback(null, passTimes);
          });
        } return callback(error, null);
      });
    } return callback(error, null);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };