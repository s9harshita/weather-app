const request = require('request')
const forecast = (lat,lon,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5e1555f8feb712f4b654f884b9a5e673&query='+lat+','+lon
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback("unable to connect to weather server!", undefined)
        }
        else if(body.error){
            callback('unable to find the location on forecast server!', undefined)
        }
        else{
            callback(undefined, (body.current.weather_descriptions[0] +". It is currently "+ body.current.temperature +" degrees out but it feels like "+ body.current.feelslike +" degrees out. The humidity is "+ body.current.humidity +"%."))
        }
    })
}
module.exports = forecast