"use strict"
const Travel = require("../models/Travel")
const FavTravel = require("../models/FavTravel")

/** Factory class used to crete Travel mongoose documents. */

class TravelFactory {

  constructor() {}

  singleTravel(data) {
    let newTravel, travelErrors

    newTravel = new Travel(data)

    travelErrors = newTravel.validateSync()

    if (travelErrors) {
      throw new Error(JSON.stringify([].concat(travelErrors)))
    }

    return newTravel
  }

  singleFavTravel(data) {
    let newTravel, travelErrors

    data.sign = data.from.placeId + data.to.placeId;
    newTravel = new FavTravel(data)

    travelErrors = newTravel.validateSync()

    if (travelErrors) {
      throw new Error(JSON.stringify([].concat(travelErrors)))
    }

    return newTravel
  }
}

module.exports = new TravelFactory()
