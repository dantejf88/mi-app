"use strict"

let
  mongoose = require("mongoose"),
  importSchema = require("./schemas/ImportLog"),
  mongoosePaginate = require("mongoose-paginate");

let importMongooseSchema = mongoose.Schema(importSchema);
importMongooseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("ImportLog", importMongooseSchema);