"use strict"

let
mongoose = require("mongoose");
let LogSchema = mongoose.Schema(require("./schemas/Log"));
module.exports = mongoose.model("Log", LogSchema);
