"use strict"

const mongoose = require("mongoose");

module.exports = {
  timestamp: {
    type: Date,
    required: false
  },
  from: {
    lat: {
      type: Number,
      required: true
    },
    lng:  {
      type: Number,
      required: true
    },
    name:  {
      type: String,
      required: true
    },
    placeId:  {
      type: String,
      required: true
    }
  },
  to: {
    lat: {
      type: Number,
      required: true
    },
    lng:  {
      type: Number,
      required: true
    },
    name:  {
      type: String,
      required: true
    },
    placeId:  {
      type: String,
      required: true
    }
  },
  deviceId: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId
  },
  distance: Number
}