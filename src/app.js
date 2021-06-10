//Run this then open localhost:3000 in a browswer

const path = require("path")
const express = require("express")
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, "../public"))

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDir =path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handlebars engine and views location
app.set("view engine","hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))

app.get("", (req, res) => {
    res.render("index",{
        title: "Weather",
        name: "Marc Herdman"
    })
})

app.get("/about", (req, res) => {
    res.render("about",{
        title: "About",
        name: "Marc Herdman"
    })
})

app.get("/help", (req, res) => {
    res.render("help",{
        msg: "You would love for me to help wouldn't you",
        title: 'Help',
        name: "Marc Herdman"
    })
})

app.get("/weather", (req, res) =>{
    if(!req.query.search)
    {
        return res.send({
            error: "Must provide a search term"
        })
    }

    geocode(req.query.search, (error, {latitude, longitude, location} = {}) => {
        if(error)
        {
            return res.send({error})
        } 
        forecast(latitude, longitude, (error, {temperature, feelslike, precip, condition} = {}) => {
            if(error)
            {
                return res.send({error})
            }
            res.send({
                temperature,
                location,
                feelslike,
                precip,
                condition
            })
        })
    })
})

app.get("/products", (req, res) =>{
    if(!req.query.search)
    {
        return res.send({
            error: "Must provide a search term"
        })
        
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) =>{
    res.render("404",{
        msg: "Help article not found",
        title: 'Help Error',
        name: "Marc Herdman"
    })
})

app.get("*", (req, res) =>{
    res.render("404",{
        msg: "Page not found",
        title: 'Error 404',
        name: "Marc Herdman"
    })
})

app.listen(port, () => {
    console.log("Servier started on port"+ port +".")
})