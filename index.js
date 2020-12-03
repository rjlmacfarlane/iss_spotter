const { fetchMyIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (!error) {
    console.log('It worked! Returned IP:' , ip);
    return;
  } else console.log("It didn't work!" , error);
});

