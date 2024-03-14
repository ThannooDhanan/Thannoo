// Replaced window.onload with window.addEventListener

window.addEventListener("load", () => {
    // Declare and initialize 'global' data
    // without using var, let, or const
    preCars = document.getElementById("preCars")
    btnCars = document.getElementById("btnCars")
    btnListings = document.getElementById("btnListings")
    ownerForm = document.getElementById("ownersForm")
    btnMakes = document.getElementById("btnToyota")
    drpDwnMakes = document.getElementById("makesDrop")
    fetchMakes()
    // TODO - change onclick to addEventListener(...)
    btnListings.addEventListener("click", makeListings)
    btnCars.addEventListener("click", fetchCars)
    btnMakes.addEventListener("click", fetchMakesList)
    ownerForm.addEventListener("click", fetchOwners)
})

//returns all cars as a string
async function fetchCars() {
    var response = await fetch("/cars")
    var data = await response.json()
    preCars.innerText = JSON.stringify(data, null, 4)
}

//gets all makes of cras in a database
async function fetchMakesList() {
    let searchMake = "/cars?make="+drpDwnMakes.value
    var response = await fetch(searchMake)
    var data = await response.json()
    preCars.innerText = JSON.stringify(data, null, 4)
}

// TODO Add code to send request for all car makes
// and create a dropdown list showing all makes.
async function fetchMakes() {
    var response = await fetch("/cars/makes")
    var makes = await response.json()
     
    makes.forEach((make) => {
      let option = document.createElement('option')
      option.innerHTML = make
      drpDwnMakes.appendChild(option)
    })
}

//function creates header for a table
function createTableHeader(dataObject){
    const row = document.createElement("tr")
    
    for(const key in dataObject){
        const header = document.createElement("th")
        header.innerHTML = key
        header.style.border = "medium solid blue"
        header.style.padding = "5px"
        row.appendChild(header)
    }
    return row
}

//create a data cell in a table
function createDataEntry(data){
    const td = document.createElement("td")
    td.innerHTML = data
    td.style.border = "medium solid blue"
    td.style.padding = "3px"
    return td
}

// crearte a row for a table
function createDataRow(dataObject){
    const row = document.createElement("tr")

    row.appendChild(createDataEntry(dataObject.name))
    row.appendChild(createDataEntry(dataObject.contact))
    return row
}

// TODO Add code to send request for all car owners
// and display owner info in a table
async function fetchOwners(){
    var response = await fetch("/cars/sellers")
    var data = await response.json()

    const ownrTbl = document.createElement("table")
    ownrTbl.style.border = "medium solid blue"
    ownrTbl.style.padding = "5px"
    ownrTbl.appendChild(createTableHeader(data[0]))
    data.forEach((seller) => {
        ownrTbl.appendChild(createDataRow(seller))
    })
    preCars.appendChild(ownrTbl)
}

async function makeListings(){
    var response = await fetch("/listings")
    var listings = await response.json()
    preCars.innerText = JSON.stringify(listings, null, 4)
}