"use strict"

let
  mongoose = require("mongoose"),
  provinceSchema = require("./schemas/Province");

let provinceMongooseSchema = mongoose.Schema(provinceSchema);

module.exports = mongoose.model("Province", provinceMongooseSchema);