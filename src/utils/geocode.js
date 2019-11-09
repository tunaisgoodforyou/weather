const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZDEyMDU4MyIsImEiOiJjazJvaXc1d3ExMGppM2pvZjhsMXp5Y2NoIn0.S-mK3pGU1UX3us03dXnfZg&limit=1`;
    request({url, json:true}, (error, {body} = {}) => {
        if (error) {
            callback('unable to connect to location services', undefined);
        } else if (body.features.length === 0) {
            callback('unable to find location', undefined);
        } else {
            const feature = body.features[0];
            callback(undefined, {
                latitude: feature.center[1],
                longitude: feature.center[0],
                location: feature.place_name,
            });
        }
    })
};

module.exports = geocode;
