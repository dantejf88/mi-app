"use strict"

module.exports = {
    sign: {
        type: String,
        required: true,
        unique: true
    },
    from: {
        name: {
            type: String,
            required: true
        },
        placeId: {
            type: String,
            required: true
        }
    },
    to: {
        name: {
            type: String,
            required: true
        },
        placeId: {
            type: String,
            required: true
        }
    }
}