
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyoverTimes, nextISSTimesForMyLocation } = require('./iss');


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

const coords = {latitude: '43.651070', longitude: '-79.347015'}
fetchISSFlyoverTimes((coords), (error, coordinates) => {

  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned flyiver times:' , coordinates);
  
});

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  
  console.log(passTimes);
});

module.exports = {printPassTimes};