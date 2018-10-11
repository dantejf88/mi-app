"use strict"

/** This class is just a promisfing wrapper for data tuneling in promise chainig. **/

class PromiseWrapper {

  constructor() {}

  /**
   * Creates a promise for wich resolves with recived data.
   * @param {Object} data - Any data you want to tunel to the next .then().
   * @return {Object} - Promise.
   */

  puff(data) {
    return new Promise((resolve) => {
      resolve(data)
    })
  }
}

module.exports = new PromiseWrapper()
