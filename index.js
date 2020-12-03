// const { fetchMyIP } = require('./iss');
// fetchMyIP((error, ip) => {
//   if (!error) {
//     console.log('It worked! Returned IP:' , ip);
//     return;
//   } else console.log("It didn't work!" , error);
// });

// const { fetchCoordsByIP } = require('./iss');
// fetchCoordsByIP((error, data) => {
//   if (!error) {
//     console.log('It worked! Returned coordinates:' , data);
//     return;
//   } else console.log("It didn't work!" , error);
// });

// const testCoords = { latitude: 37.751, longitude: -97.822 };
// const { fetchISSFlyOverTimes } = require('./iss');
// fetchISSFlyOverTimes(testCoords, (error, data) => {
//   if (!error) {
//     console.log('It worked! Returned flyover times:' , data);
//     return;
//   } else console.log("It didn't work!" , error);
// });

const { nextISSTimesForMyLocation } = require('./iss');
nextISSTimesForMyLocation((error, passTimes) => {
  if (!error) {
    if (passTimes === null) return; // Hold if no data on initial request (works in async scenarios in particular)
    console.log(passTimes);
  } else {
    console.log('Error', error);
  }
});