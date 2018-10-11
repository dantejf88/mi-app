"use strict"

let
  mongoose = require("mongoose"),
  alertGraphClientSchema = require("./schemas/AlertGraphClient"),
  mongoosePaginate = require("mongoose-paginate");

let alertGraphClientMongooseSchema = mongoose.Schema(alertGraphClientSchema);
alertGraphClientMongooseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("AlertGraphClient", alertGraphClientMongooseSchema);
