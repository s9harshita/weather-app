const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiczloYXJzaGl0YSIsImEiOiJja3BmMzM5aW4xeHF2MndsbGZobGdwaXF6In0.A0r8M5Bhkde4smr-G2Y6sQ&limit=1'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        }
        else if(body.features.length === 0){
            callback('unable to find the location on location server!', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode