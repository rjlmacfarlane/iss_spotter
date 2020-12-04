const request = require('request-promise-native');

// Fetch IP address
const fetchMyIP = () => request('https://api.ipify.org?format=json'); // Redundant, but required by Compass

// Fetch geolocation coordinates
const fetchCoordsByIP = () => {
  return request('https://freegeoip.app/json/');   // ipvigilante.com DOES NOT WORK [ERR_TLS_CERT_ALTNAME_INVALID]
};

// Fetch ISS Flyover Times
const fetchISSFlyOverTimes = (body) => {
  const data = JSON.parse(body);
  const coords = { latitude: data.latitude, longitude: data.longitude };
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`);
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };