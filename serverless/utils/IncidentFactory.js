"use strict"
const Incident = require("../models/Incident")

/** Factory class used to crete Incident mongoose documents. */

class IncidentFactory {

  constructor() {}

  /**
   * Create an new Incident mongoose document instance with a desired Incident array, zone and version.
   * @param {Object} data - Object wich contains every parameter needed to create a new Incident mongoose document instance.
   * @param {Date} data.timestamp - Incident creation date (RFC-3339).
   * @param {Number} data.lat - Incident center latitude.
   * @param {Number} data.lon - Incident center longitude.
   * @param {String} data.speed - Vehicle speed at incident time.
   * @param {String} data.incidentType - Incident type, it has enumerated values.
   * @param {String} data.deviceId - Incident deviceId.
   * @return {Object} - {Incident, Boolean} - New incident and stable flag (if stable persists on mongo, if dynamic on redis).
   */

  singleIncident(data) {
    let newIncident, incidentErrors, isStableIncident = false

    if (data) {
      newIncident = new Incident(data)
    } else {
      newIncident = new Incident({})
    }

    incidentErrors = newIncident.validateSync()

    if (incidentErrors) {
      throw new Error(JSON.stringify([].concat(incidentErrors)))
    }

    return {
      newIncident
    }
  }
}

module.exports = new IncidentFactory()
