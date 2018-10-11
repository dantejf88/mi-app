"use strict"

const mongoose = require("mongoose");

module.exports = {
  email: {
    type: String,
    unique: true,
    sparse: true
  },
  password: {
    type: String
  },
  socialId: {
    type: String
  },
  device: {
    type: String
  },
  deviceId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  userType: {
    type: String,
    required: false
  },
  age: {
    type: Date
  },
  car: {
    type: String
  },
  vehicleType: {
    type: String
  },
  vehicle: {
    type: String
  },
  location: {
    type: String
  },
  locationPlaceId: {
    type: String
  },
  phone: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  }
}
