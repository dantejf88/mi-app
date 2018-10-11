"use strict"

let
mongoose = require("mongoose");
let ErrorSchema = mongoose.Schema(require("./schemas/Error"));
module.exports = mongoose.model("Error", ErrorSchema);
