const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/433d43be02760e4b528c36b74cd4d7bc/${latitude},${longitude}?units=si`;
    request({url, json:true}, (error, {body} = {}) => {
        if (error) {
            callback('unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('unable to find weather data', undefined);
        } else {
            const currently = body.currently;
            const today = body.daily.data[0].summary;
            const message = `${today} It is currently ${currently.temperature} degrees out. There is a ${currently.precipProbability * 100}% of rain.`;
            callback(undefined, message);
        }
    });
};

module.exports = forecast;
