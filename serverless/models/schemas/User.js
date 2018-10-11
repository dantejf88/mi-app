"use strict"

module.exports = {
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
}