"use strict"

const mongoose = require("mongoose");

module.exports = {
  zone: {
    type: String,
    required: true
  },
  maV: {
    type: Number,
    required: true
  },
  miV: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  insert: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alert",
    required: true
  }],
  update: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alert",
    required: true
  }],
  delete: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alert",
    required: true
  }]
}
