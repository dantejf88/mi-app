"use strict"
let alertUpdateSchema = require("./AlertUpdate")

delete alertUpdateSchema.provinceId.required

module.exports = Object.assign({}, alertUpdateSchema)
