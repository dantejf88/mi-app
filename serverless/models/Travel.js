"use strict"

let
  mongoose = require("mongoose"),
  travelSchema = require("./schemas/Travel"),
  mongoosePaginate = require("mongoose-paginate");

let travelMongooseSchema = mongoose.Schema(travelSchema);
travelMongooseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Travel", travelMongooseSchema);