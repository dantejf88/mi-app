"use strict"

let
  mongoose = require("mongoose"),
  incidentSchema = require("./schemas/Incident"),
  mongoosePaginate = require("mongoose-paginate");

let incidentMongooseSchema = mongoose.Schema(incidentSchema);
incidentMongooseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Incident", incidentMongooseSchema);