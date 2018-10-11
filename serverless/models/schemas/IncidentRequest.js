"use strict"
let incidentSchema = require("./Incident")

delete incidentSchema.provinceId.required

module.exports = Object.assign({}, incidentSchema)
