const { fetchMyIP } = require('./iss_promised');
const { fetchCoordsByIP } = require('./iss_promised');
const { fetchISSFlyOverTimes } = require('./iss_promised');

// Parse and log ISS flyover times
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

// Sequentially fetch IP, geolocation, and ISS flyover times
const nextISSTimesForMyLocation = () => {
  fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    })
    .then(passTimes => printPassTimes(passTimes)).catch((error) => {
      console.log("It didn't work: ", error.message);
    });
    
};
nextISSTimesForMyLocation();
