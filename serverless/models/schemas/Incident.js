"use strict"

const mongoose = require("mongoose");

module.exports = {
  timestamp: {
    type: Date,
    required: true
  },
  provinceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Province",
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lon: {
    type: Number,
    required: true
  },
  incidentType: {
    type: String,
    required: true
  },
  deviceId: {
    type: String
  },
  vehicleType: {
    type: String
  },
  userName: {
    type: String
  },
  userLastName: {
    type: String
  },
  userEmail: {
    type: String
  },
  speed: {
    type: Number
  },
  travelId: {
    type: mongoose.Schema.Types.ObjectId
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId
  },
  time: {
    type: Number
  },
  distance: {
    type: Number
  }
}