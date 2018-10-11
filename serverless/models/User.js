"use strict"

let
  mongoose = require("mongoose"),
  userSchema = require("./schemas/User"),
  mongoosePaginate = require("mongoose-paginate");

let userMongooseSchema = mongoose.Schema(userSchema);
userMongooseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", userMongooseSchema);