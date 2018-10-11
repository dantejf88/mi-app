"use strict"
const
AlertZone = require("../models/AlertZone"),
mongoose = require("mongoose")

/**
*   This class is used to handle every alert zone set.
*   It mantains the corresponding structure, creating proper commits
*   and saving every transaction on the db when needed.
**/

class AlertZoneManager {

  /**
   * AlertZoneManager constructor
   * @param {DBManager instace} mdb
   * @return
   */

  constructor(mdb) {
    this.mdb = mdb
  }

  /**
   * Return database state
   * @return {number} - 1 === connected
   */

  readyState() {
    return this.mdb.readyState
  }

  /**
   * Rebase the current version flattening every change and setting a new major version.
   * @return {AlertZone}
   */

  rebaseFromSource(alertBaseArray, zone) {
    zone.toString()
    alertBaseArray.pop()
  }

  /**
   * Add alert to specific zone, creates proper commit.
   * @return {Commit}
   */

  addAlert(alertBaseArray, zone) {
    zone.toString()
    let diff = alertBaseArray
    return diff
  }

  /**
   * Update alert to specific zone, creates proper commit.
   * @return {Commit}
   */

  updateAlert(alertBaseArray, zone) {
    zone.toString()
    let diff = alertBaseArray
    return diff
  }

  /**
   * Remove alert to specific zone, creates proper commit.
   * @return {Commit}
   */

  removeAlert(alertBaseArray, zone) {
    zone.toString()
    let diff = alertBaseArray
    return diff
  }

  /**
   * Add multiple alerts to specific zone, creates proper commit.
   * @return {Commit}
   */

  addAlertBlock(alertBaseArray, zone) {
    zone.toString()
    let diff = alertBaseArray
    return diff
  }

  /**
   * Update multiple alerts to specific zone, creates proper commit.
   * @return {Commit}
   */

  updateAlertBlock(alertBaseArray, zone) {
    zone.toString()
    let diff = alertBaseArray
    return diff
  }

  /**
   * Remove multiple alerts to specific zone, creates proper commit.
   * @return {Commit}
   */

  removeAlertBlock(alertBaseArray, zone) {
    zone.toString()
    let diff = alertBaseArray
    return diff
  }

  /**
   * Returns the last commits from zone, after the specified version.
   * @return {[Commit]}
   */

  getLastCommitsFromZone(alertBaseArray, zone) {
    zone.toString()
    alertBaseArray.pop()
  }
}

// ** Single instance pattern ** //
module.exports = new AlertZoneManager()
