const request = require('request')

const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=9c38e2ee7b51d517a523cc8402332899&query="+lat+","+long+"&units=f"
    request({url:url, json:true}, (error,{body}) => {
        if(error)
        {
            callback('Unable to connect to loaction services!', undefined)
        }
        else if(body.error)
        {
            callback("Unable to find location. Try another search.", undefined)
        }
        else
        {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                precip: body.current.precip,
            })
        }
    })
}

module.exports = forecast