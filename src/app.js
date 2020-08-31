const path=require('path')
const express=require('express')
const hbs=require('hbs')

const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

const app=express()

const port = process.env.PORT || 3003

// setting handlebars
const publicDirectoryPath=path.join(__dirname,'../public')
app.set('view engine','hbs')

// Define path for express config
const viewPath=path.join(__dirname,'../template/views')
app.set('views', viewPath)

// setting up static directory
app.use(express.static(publicDirectoryPath))

// setting up partials
const partialsPath=path.join(__dirname,'../template/partials')
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Wheather',
        name:'Andrew'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'Andrew',
        title:'About me'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        msg:'Call me on @#$%^&*(*&^%$#@',
        name:'Andrew',
        title:'Help'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Address to do bhayyaa'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude, (error, forecast) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast,
                address: req.query.address
            })
          })
    })
})


// app.get('/product',(req,res)=>{
//     if(!req.query.key){
//         return res.send({
//             error:'You Must prove some key'
//         })
//     }
//     console.log(req.query)
//     res.send({
//         product:[]
//     })
//     })

app.get('/help/*',(req,res)=>{
    res.render('page404',{
        title:'404',
        name:'Andrew',
        errormsg:'Help article not found'
    })
})


app.get('*',(req,res)=>{
    res.render('page404',{
        title:'404',
        name:'Andrew',
        errormsg:'Page does not exit'
    })
})



app.listen(port,()=>{
    console.log('server started on port'+ port)
})