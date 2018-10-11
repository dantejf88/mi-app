"use strict"

let
  mongoose = require("mongoose"),
  vehicleTypeSchema = require("./schemas/VehicleType");

let vehicleTypeMongooseSchema = mongoose.Schema(vehicleTypeSchema);

module.exports = mongoose.model("VehicleType", vehicleTypeMongooseSchema);