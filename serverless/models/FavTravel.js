"use strict"

let
  mongoose = require("mongoose"),
  favTravelSchema = require("./schemas/FavTravel"),
  mongoosePaginate = require("mongoose-paginate");

let favTravelMongooseSchema = mongoose.Schema(favTravelSchema);
favTravelMongooseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("FavTravel", favTravelMongooseSchema);
