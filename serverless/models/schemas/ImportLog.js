"use strict"

const mongoose = require("mongoose");

module.exports = {
  name: {
    type: String
  },
  user: {
   	type: String
  },
  timestamp: {
  	type: Date
  },
  total: {
  	type: Number
  },
  inserted: {
  	type: Number
  },
  updated: {
  	type: Number
  },
  failed: {
  	type: Number
  },
  duplicated: {
  	type: Number
  },
  validation: {
  	type: Boolean
  }
}
