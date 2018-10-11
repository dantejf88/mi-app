"use strict"
const Commit = require("../models/Commit")

/** Factory class used to crete Commit mongoose documents. */

class CommitFactory {
  constructor() {}

  /**
   * Create an new Commit mongoose document instance with a desired Commit array, zone and version.
   * @param {Object} data - Object wich contains every parameter needed to create a new Commit mongoose document instance.
   * @param {Boolean} data.maV - Commit major version. X / (version = X.y)
   * @param {Boolean} data.miV - Commit minor version. y / (version = X.y)
   * @param {Date} data.timestamp - Alert creation date (RFC-3339).
   * @param {Array} data.insert - Commit array, in this case just a unique element array.
   * @return {Commit} - Commit mongoose document instance.
   */

  insert(data) {

    let newCommit = new Commit(data)

    delete newCommit.update
    delete newCommit.delete

    return newCommit
  }
  /**
   * Create an new Commit mongoose document instance with a desired Commit array, zone and version.
   * @param {Object} data - Object wich contains every parameter needed to create a new Commit mongoose document instance.
   * @param {Boolean} data.maV - Commit major version. X / (version = X.y)
   * @param {Boolean} data.miV - Commit minor version. y / (version = X.y)
   * @param {Date} data.timestamp - Alert creation date (RFC-3339).
   * @param {Array} data.update - Commit array, in this case just a unique element array.
   * @return {Commit} - Commit mongoose document instance.
   */

  update(data) {

    let newCommit = new Commit(data)

    delete newCommit.insert
    delete newCommit.delete

    return newCommit
  }
  /**
   * Create an new Commit mongoose document instance with a desired Commit array, zone and version.
   * @param {Object} data - Object wich contains every parameter needed to create a new Commit mongoose document instance.
   * @param {Boolean} data.maV - Commit major version. X / (version = X.y)
   * @param {Boolean} data.miV - Commit minor version. y / (version = X.y)
   * @param {Date} data.timestamp - Alert creation date (RFC-3339).
   * @param {Array} data.delete - Commit array, in this case just a unique element array.
   * @return {Commit} - Commit mongoose document instance.
   */

  delete(data) {

    let newCommit = new Commit(data)

    delete newCommit.insert
    delete newCommit.update

    return newCommit
  }

}

module.exports = new CommitFactory()
