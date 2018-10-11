"use strict"
const
  Alert = require("../models/Alert"),
  mongoose = require("mongoose")

/** Factory class used to crete Alert mongoose documents. */

class AlertFactory {

  constructor() {}

  singleAlert(data) {
    let newAlert, alertErrors

    newAlert = new Alert(data)

    alertErrors = newAlert.validateSync()

    if (alertErrors) {
      throw new Error(JSON.stringify([].concat(alertErrors)))
    }

    return newAlert
  }

  multipleAlerts(data) {
    let newAlert, alertErrors

    for (const alertIndex of data) {
      newAlert = new Alert(data[alertIndex])
      alertErrors = newAlert.validateSync()
    }

    if (alertErrors) {
      throw new Error(JSON.stringify([].concat(alertErrors)))
    }

    return newAlert
  }

  modifyAlert(data) {
    let updatedAlert, validationAlert, alertErrors

    if (data) {

      validationAlert = new Alert(data)

      updatedAlert = Alert.findOneAndUpdate({
        "_id": mongoose.Types.ObjectId(data._id)
      }, data, {new: true, upsert: true})
    }

    alertErrors = validationAlert.validateSync()

    if (alertErrors) {
      throw new Error(JSON.stringify([].concat(alertErrors)))
    }

    return updatedAlert
  }
}

module.exports = new AlertFactory()
