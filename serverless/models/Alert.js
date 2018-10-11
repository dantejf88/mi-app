"use strict"

let
  mongoose = require("mongoose"),
  alertSchema = require("./schemas/AlertInput"),
  mongoosePaginate = require("mongoose-paginate")

let alertMongooseSchema = mongoose.Schema(alertSchema)
alertMongooseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Alert", alertMongooseSchema);
