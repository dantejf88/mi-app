"use strict"
const mongoose = require("mongoose");
const durationValidator = function durationValidator() {
  const temporal = this.alertOptions && this.alertOptions.temporal ? true : false
  return temporal
}

module.exports = {
  timestamp: {
    type: Date,
    required: false
  },
  description: {
    type: String
  },
  provinceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Province",
    required: true
  },
  alertOptions: {
    critical: {
      type: Boolean,
      default: false
    },
    temporal: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 0,
      required: durationValidator
    },
    radius: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      default: 0
    }
  },
  lat: {
    type: Number,
    required: true
  },
  lon: {
    type: Number,
    required: true
  },
  alertType: {
    type: String,
    required: true
  },
  state: {
    type: String,
    default: "A"
  },
  zone: {
    name: {
      type: String
    },
    maV: {
      type: Number
    },
    miV: {
      type: Number
    }
  },
  name: {
    type: String
  },
  subtype: {
    type: String
  },
  velocity: {
    type: Number
  },
  direction: {
    type: Number
  },
  orientation: {
    type: Number
  },
  latSouth: {
    type: String
  },
  lonWest: {
    type: String
  },
  latNorth: {
    type: String
  },
  lonEast: {
    type: String
  },
  info: {
    type: String
  },
  source: {
    type: String
  },
  street: {
    type: String
  },
  streetNumber: {
    type: String
  },
  end: {
    type: String
  },
  cross: {
    type: String
  },
  country: {
    type: String
  },
  city: {
    type: String
  },
  disposal: {
    type: String
  },
  initDate: {
    type: String
  },
  serialNumber: {
    type: String
  },
  checksum: {
    type: String
  }
}
