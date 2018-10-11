"use strict"

let
  mongoose = require("mongoose"),
  userSchema = require("./schemas/UserApp"),
  mongoosePaginate = require("mongoose-paginate");

let userMongooseSchema = mongoose.Schema(userSchema);
userMongooseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("UserApp", userMongooseSchema);