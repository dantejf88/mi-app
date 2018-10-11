"use strict"
const mongoose = require("mongoose"),
  bluebird = require("bluebird")

mongoose.Promise = bluebird

/** Sinlge instance MongoDB Manager class used to handle mongodb connection. Configuration based. */

class DBManager {

  /**
   * Create a new mongodb connection through mongoose.connect method.
   * @param {Object} mdbConfig - Object wich contains every parameter needed to create a mongodb connection uri string.
   */

  constructor(mdbConfig) {
    this.mdbUri = this.mdbUriFactory(mdbConfig)
  }

  /**
   * Create a new mongodb connection through mongoose.connect method.
   * @param {Function} callback - AWS Lambda callback, for handling an http response in case of error.
   * @return {Object} - The db connection handler.
   *                    Is a client object wich allows you perform db operations, like review if db is on ready state
   *                    (mongoose.connection.readyState === 1), and perform CRUD operations.
   */

  connectToMongoDB() {
    mongoose.connect(this.mdbUri, this.options)
    return mongoose.connection
  }

  /**
   * INTERNAL METHOD. CLIENT SHOULD NOT USE IT!
   * Used for getting a connection string uri based on configuration object.
   * @param {Object} mdbConfig - Object wich contains every parameter needed to create a mongodb connection uri string.
   * @param {Boolean} mdbConfig.isTestingEnv - Is the db on testing enviroment, used for test suites proposals.
   * @param {String} mdbConfig.mdbUser - mongodb user.
   * @param {String} mdbConfig.mdbPassword - mongodb password.
   * @param {String} mdbConfig.mdbHostAndPort - mongodb host.
   * @return {Object} - mongodb connection uri string.
   */

  mdbUriFactory(mdbConfig) {
    let mdbLocalUri
    const mongoDbProtocol = "mongodb://"

    if (mdbConfig.isTestingEnv) {
      mdbConfig.mdb += "-testing"
    }

    mdbLocalUri = mongoDbProtocol + mdbConfig.mdbHostAndPort + "/" + mdbConfig.mdb

    this.options = {
      useMongoClient: true,
      poolSize: 5,
      promiseLibrary: bluebird,
      user: mdbConfig.mdbUser,
      pass: mdbConfig.mdbPassword
    }

    return mdbLocalUri
  }
}

module.exports = DBManager
