const request=require('request')
const forecast= (latitude,longitude,callback) =>{
    const url='http://api.weatherstack.com/current?access_key=28817f2cc4695c9fb40774e8ff3eed80&query='+latitude+','+longitude+'&units=f'
    console.log(url)
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }
        else{
            if(body.success===false){
                callback(body.error.info,undefined)
            }
            else{
                callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+ ' degrees out. But it feels like '+body.current.feelslike+' degrees out. The humidity is at '+body.current.humidity+'%' )
            }
        }
    })
}



module.exports =forecast