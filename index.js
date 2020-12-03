const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (!error) {
    if (passTimes === null) return; // Hold if no data on initial request (works in async scenarios in particular)
    printPassTimes(passTimes);
  } else {
    console.log('Error', error);
  }
});