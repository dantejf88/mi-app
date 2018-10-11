module.exports = {
  message: {
    type: String
  },
  userId: {
    type: String
  },
  deviceId: {
    type: String
  },
  userName: {
    type: String
  },
  timestamp: {
    type: Date,
    default: new Date()
  }
}