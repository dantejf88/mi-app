"use strict"
let favTravelInputSchema = require("./FavTravel")

delete favTravelInputSchema.sign.required

module.exports = Object.assign({}, favTravelInputSchema)
