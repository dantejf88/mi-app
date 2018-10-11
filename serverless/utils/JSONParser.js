"use strict"

/** This class is just a promisfing wrapper for JSON.parse. **/

class JSONParser {

  constructor() {}

  /**
   * Creates a promise for wich resolves with JSON parse result.
   * @param {String} dataString - Stringified JSON object.
   * @return {Object} - Parsed JSON.
   */

  parse(jsonDataString) {
    const jsonPromise = (resolve) => {
      try {
        const jsonDataObject = JSON.parse(jsonDataString)
        resolve(jsonDataObject)
      } catch (e) {
        resolve(null)
      }
    }
    return new Promise(jsonPromise)
  }
}

module.exports = new JSONParser()
