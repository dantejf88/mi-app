"use strict"

const mongoose = require("mongoose");
const moment = require("moment");

module.exports = {
  message: {
    type: String
  },
  stack: {
    type: String
  },
  timestamp: {
    type: Date,
    default: new Date()
  },
  date: {
    type: String,
    default: moment().format("MMMM Do YYYY, h:mm:ss a")
  },
  deviceId: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserApp"
  }
}