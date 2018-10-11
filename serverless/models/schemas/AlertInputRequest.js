"use strict"
let alertInputSchema = require("./AlertInput")

delete alertInputSchema.provinceId.required

module.exports = Object.assign({}, alertInputSchema)
