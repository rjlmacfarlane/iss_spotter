const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (!error) {
    console.log('It worked! Returned IP:' , ip);
    return;
  } else console.log("It didn't work!" , error);
});

fetchCoordsByIP((error, data) => {
  if (!error) {
    console.log('It worked! Returned coordinates:' , data);
    return;
  } else console.log("It didn't work!" , error);
});