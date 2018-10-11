"use strict"

let
mongoose = require("mongoose"),
commitSchema = require("./schemas/CommitInput")
let commitMongooseSchema = mongoose.Schema(commitSchema)

module.exports = mongoose.model("Commit", commitMongooseSchema)
