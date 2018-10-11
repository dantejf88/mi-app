"use strict"

module.exports = {
    name: {
        type: String,
        required: true,
        unique: true
    },
    shortname: {
        type: String,
        required: true,
        unique: true
    },
    placeId: {
        type: String,
        required: true,
        unique: true
    }
}