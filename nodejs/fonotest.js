var fonoapi = require("fonoapi-nodejs");
//fonoapi.token = '167f85c4966cfb34e9ae3748c6fd38d5e9173738ad13aa23';

// get devices w/ brand
fonoapi.getDevices(myCallback, 'iphone', 'apple');
// get devices w/o brand
//fonoapi.getDevices(myCallback, 'iphone 6S');

// get latest devices from apple (limit result to 5)
//fonoapi.getLatest(myCallback, 5, 'apple');

var n = 0;

function myCallback(queryString, data) {
    console.log(n++);
    //console.log(data.Brand + " " + data.DeviceName);
}