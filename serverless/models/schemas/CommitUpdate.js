"use strict"
let commitInputSchema = require("./CommitInput")

module.exports = Object.assign({}, commitInputSchema, {
  _id: {
    type: String,
    required: true
  }
})
