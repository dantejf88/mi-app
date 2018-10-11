"use strict"
let alertInputSchema = require("./AlertInput")

module.exports = Object.assign({}, alertInputSchema, {
  _id: {
    type: String,
    required: true
  }
})
