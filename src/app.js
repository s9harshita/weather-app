const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
//Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Harshita Singh'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me!',
        name: 'Harshita Singh'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!',
        name: 'Harshita Singh',
        msg: 'For any help contact us.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address!'
        })
    }
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error         // shorthand systax    error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                address,
                forecast: forecastData,
                location
            })
        })
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found!',
        title: '404 Page',
        name: 'Harshita Singh'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found!',
        title: '404 Page',
        name: 'Harshita Singh'
    })
})

app.listen(port, () => {
    console.log('server is up on port '+port+'!')
})