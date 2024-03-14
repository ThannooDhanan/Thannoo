//Sample request: localhost:3000/cars?make=Toyota
// Import the express module
const express = require("express")

// Instantiate the Express framework.
const app = express()

// Import the car data module
const { carsForSale } = require("./model/carData.js")

// Set up folder location for static pages
// Note: we will need to change to __dirname + "/public" later
app.use(express.static("public"))

// Start the server
app.listen(3000, () => {
    console.log("Server has started")
})


// Return all cars
//      TODO Add optional query parameter to specify car make
//      Sample request: /cars?make=Toyota
app.get("/cars", (req, res) => {
    let result = []
    if (req.query.make){
        carsForSale.forEach((car) =>{
            if(car.make == req.query.make)
                result.push(car)
        })
    }
    else
        result = carsForSale
    res.json(result)
})

// TODO: Add endpoint to return array of car makes (no duplicates)
app.get("/cars/makes", (req, res) =>{
    let makes = []
    carsForSale.forEach((car) => {
        if(makes.indexOf(car.make) == -1)
            makes.push(car.make)
    })
    res.json(makes)
})

// Add endpoint for path parameter to specify car make
// Sample request: /cars/makes/Toyota
app.get("/cars/makes/Kia", (req,res) => {
    let make = []
    carsForSale.forEach((car) => {
        if(car.make == "Kia") make.push(car)
    })
    res.json(make)
})


// TODO Add endpoint to return all owners
// Sample request: /cars/owners
app.get("/cars/owners", (req,res)=>{
    let owners = []
    carsForSale.forEach((car)=>{
        owners.push(car.seller.name)
    })
    res.json(owners)
})


//Added endpoint that returns a brief listing of all cars
app.get("/listings", (req, res)=>{
    let listings = []
    carsForSale.forEach((car) => { 
        listings.push(breifListing(car))
    })
    res.json(listings)
//complete this handler on your own
})

//create a car object
function breifListing(car){
    let listing  = {}
    listing.year = car.year
    listing.make = car.make
    listing.model = car.model
    listing.price = car.price
    return listing
}

//added endpoint that returns array of seller objects
app.get("/cars/sellers", (rep,res)=>{
    let sellers = []
    carsForSale.forEach((car) =>{
        sellers.push(car.seller)
    })
    res.json(sellers)
})