"use strict"
const redis = require("redis"),
  bluebird = require("bluebird"),
  ERRORS = require("./Errors")

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

/** Sinlge instance Redis Manager class used to handle redis connection. Configuration based. */

class CacheManager {

  constructor(redisConfig) {
    this.redisUri = this.redisUriFactory(redisConfig)
    this.redisPassword = redisConfig.redisPassword
  }

  connectToRedis() {

    let client = redis.createClient({
      url: this.redisUri,
      password: this.redisPassword
    })

    return client
  }

  /**
   * INTERNAL METHOD. CLIENT SHOULD NOT USE IT!
   * Used for getting a connection string uri based on configuration object.
   * @param {Object} redisConfig - Object wich contains every parameter needed to create a redis connection uri string.
   * @param {Boolean} redisConfig.isTestingEnv - Is the db on testing enviroment, used for test suites proposals.
   * @param {String} redisConfig.redisPassword - redis password.
   * @param {String} redisConfig.redisHostAndPort - redis host.
   * @param {String} redisConfig.redisDBNumber - redis db number, must be numeric.
   * @return {Object} - redis connection uri string.
   */

  redisUriFactory(redisConfig) {
    let redisLocalUri

    const redisProtocol = "redis://"

    if (!redisConfig.isTestingEnv && redisConfig.redisDBNumber === "11") {
      throw new Error(ERRORS.REDIS_DB_NUMBER)
    }

    if (redisConfig.isTestingEnv) {
      redisConfig.redisDBNumber = "11"
    }

    if (redisConfig.redisDBNumber) {
      redisLocalUri = redisProtocol + redisConfig.redisHostAndPort + "/" + redisConfig.redisDBNumber
    } else {
      redisLocalUri = redisProtocol + redisConfig.redisHostAndPort
    }

    return redisLocalUri
  }

  /**
   * OPERATION METHOD.
   * Attached to the client returned by connectToRedis.
   * @param {String} version - version in format X.y
   * @return {Object} - { maV = Major version, miV = Minor version, error = Exception }
   */

  parseNumericVersionFromString(versionString) {
    let
      maV,
      miV,
      error,
      versionArray

    versionString = String(versionString)

    versionArray = versionString.split(".")
    maV = parseInt(versionArray[0], 10)
    miV = parseInt(versionArray[1], 10)

    return {
      maV,
      miV,
      error
    }
  }

  /**
   * OPERATION METHOD.
   * Recives version number into a ordered pair majorV, minorV and returns a specific wich represents itself on redis db.
   * @param {Number} commitCurrentMajor - major version.
   * @param {Number} commitNewMinorVersion - minor version.
   * @return {String} - Stringified version.
   */

  stringifyVersion(commitCurrentMajor, commitNewMinorVersion) {
    return commitCurrentMajor + "." + commitNewMinorVersion
  }
}

module.exports = CacheManager
