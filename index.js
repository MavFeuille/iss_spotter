
const { fetchMyIP, fetchCoordsByIP  } = require('./iss');
// const { fetchCoordsByIP } = require('./iss').fetchCoordsByIP;

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  
  console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIP('99.245.138.209', (error, coordinates) => {
  
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned coordinates:' , coordinates);
  
});