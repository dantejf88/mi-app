"use strict"
const parallel = require("async/parallel");
const reflectAll = require("async/reflectAll");
const gmaps = require("@google/maps");
const ERRORS = require("./Errors");
const Province = require("../models/Province");
const GMAPS_TYPES = {
  POLITICAL: "political",
  PROVINCE: "administrative_area_level_1"
}
const GMAPS_CABA_TYPES = {
  POLITICAL: "political",
  PROVINCE: "administrative_area_level_1"
}
/** This class helps to the server to localize easily where a (lat, lon) pair belongs. **/

class GeocodingClient {

  constructor() {
    this.gmClient = gmaps.createClient({
      key: process.env.GOOGLE_MAPS_GEOCODINGCLIENT_API_KEY
    })
  }

  /**
   * INTERNAL METHOD. CLIENT SHOULD NOT USE IT!
   * Geocode and promisify.
   * @param {Number} data.lat - Place latitude number.
   * @param {Number} data.lon - Place longitude number.
   */

  reverseGeocode(data) {
    return new Promise((res, rej) => {
      const { lat, lon } = data
      this.gmClient.reverseGeocode({ latlng: [lat, lon] }, (error, position) => {
        if (error) {
          rej(error)
        } else {
          res(position)
        }
      })
    })
  }
  /**
   * INTERNAL METHOD. CLIENT SHOULD NOT USE IT!
   * Review if parameter is a number.
   * @param {Object} data - Alert Input object.
   * @param {Number} data.lat - Place latitude number.
   * @param {Number} data.lon - Place longitude number.
   * @return {String} - A zone name.
   */

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  /**
   * INTERNAL METHOD. CLIENT SHOULD NOT USE IT!
   * Review if position retrived for inverse geocoding is a Province.
   * @param {Array} types - Google maps types array
   */

  isProvince(types) {
    return types.reduce((previousValue, currentValue) => {
      let acumulator = 0
      acumulator += currentValue === GMAPS_TYPES.POLITICAL ? 1 : 0
      acumulator += currentValue === GMAPS_TYPES.PROVINCE ? 1 : 0
      return previousValue + acumulator
    }, 0) === 2
  }

  /**
   * INTERNAL METHOD. CLIENT SHOULD NOT USE IT!
   * Review if a province array query from mongoose is empty or not.
   * @param {Array} provinces - Province model array
   */

  provinceExist(array) {
    return array && Array.isArray(array) && array[0];
  }

  /**
   * Calculates the zone where the pair (lat, lon) belongs.
   * @param {Object} data - Alert Input object.
   * @param {Number} data.lat - Place latitude number.
   * @param {Number} data.lon - Place longitude number.
   * @return {String} - A zone name.
   */

  async getZoneFromLatLon(data) {
      let errors = []
      try {

        if (!data) {
          errors.push(ERRORS.GEOCODING.NULL);
        }

        if (!data.lat) {
          errors.push(ERRORS.GEOCODING.NULL_LAT);
        }

        if (!data.lon) {
          errors.push(ERRORS.GEOCODING.NULL_LON);
        }

        if (!this.isNumeric(data.lat) && !this.isNumeric(data.lon)) {
          errors.push(ERRORS.GEOCODING.NON_NUMERIC_INPUT);
        }

        const position = await this.reverseGeocode(data);

        if (position.json && position.json.error_message) {
          /* GMAPS ERROR MESSAGE */
          errors.push(`${ERRORS.GEOCODING.GMAPS_API} ${position.json.error_message}`);

        } else if (position.json && position.json.status !== "OK" && position.json.status !== "ZERO_RESULTS") {
          /* GMAPS NO ERROR MESSAGE BUT ERROR STATUS */
          errors.push(`${ERRORS.GEOCODING.GMAPS_API} ${position.json.status}`);

        } else if (position.json && position.json.status === "OK" && position.json.results) {
          let province
          /* GMAPS OK RESPONSE */
          const provinceArray = position.json.results.filter((result) => {

            if (this.isProvince(result.types)) {
              const adressComponents = result.address_components.filter(address => address.types && Array.isArray(address.types) && this.isProvince(address.types))

              if (adressComponents.length === 1) {
                /* HALF A WAY OF HAPPY PATH :D! AT LEAST ONE IS PROVINCE, SO THIS COULD BE A PROVINCE! */
                province = adressComponents[0]
                return true
              }
              return false
            }
            return false
          })

          /* EXACT AMOUNT OF TYPES ? */
          if (provinceArray.length <= 0) {
            errors.push(`${ERRORS.GEOCODING.GMAPS_NOT_FOUND_PROVINCE}`)
          } else if (provinceArray.length >= 2) {
            errors.push(`${ERRORS.GEOCODING.GMAPS_AMBIG}`)
          } else {
            /* HAPPY PATH :D! THIS IS A PROVINCE! */
            const provinceData = {
              placeId: provinceArray[0].place_id,
              name: province.long_name,
              shortname: province.short_name
            }

            const provinceExistArray = await Province.find(provinceData)
            let newProvince, provinceId

            if (this.provinceExist(provinceExistArray)) {
              provinceId = provinceExistArray[0]._id
            } else {
              newProvince = await Province.create(provinceData)
              provinceId = newProvince._id
            }

            data = Object.assign(data, { provinceId })

          }

        } else if (position.json && position.json.status === "ZERO_RESULTS") {
          /* GMAPS UNKNOWN STATUS */
          errors.push(`${ERRORS.GEOCODING.GMAPS_NOT_FOUND_PROVINCE}`)
        } else {
          /* GMAPS UNKNOWN STATUS */
          errors.push(`${ERRORS.GEOCODING.GMAPS_API_UNKNOWN}`)
        }

      } catch (error) {
        errors.push(`${ERRORS.GEOCODING.GMAPS_API} ${error}`)
      }

      if (errors.length > 0) {
        return Promise.reject(JSON.stringify(errors))
      }

      data.zone = {
        name: "ZONE_0"
      }

      return data

  }
  /**
   * Calculates the zone where the pair (lat, lon) belongs for an array of pairs.
   * @param {Array} dataArray - Array of Alert Input objects.
   * @param {Number} dataArray[n].lat - Place latitude number.
   * @param {Number} dataArray[n].lon - Place longitude number.
   * @return {String} - A zone name.
   */

  getZoneFromLatLonArray(dataArray) {


    return new Promise((res, rej) => {

      let tasks = dataArray.map((alert, index) => {
        return (callback) => {
          this.getZoneFromLatLon(alert)
            .then(() => {
              return callback(null, alert)
            })
            .catch((validationErrors) => {

              let
                message = validationErrors && validationErrors.message ? validationErrors.message : validationErrors

              try {
                message = JSON.parse(message)
              } catch (error) {
                message = message
              }

              return callback({
                message,
                index
              })
            })
        }
      })

      const callbackHandler = (brutalException, resultArray) => {

        if (brutalException) {
          return rej(brutalException)
        }

        let
          geocodingErrorArray = resultArray.map(result => {
            let alert = result && result.error ? result : null
            return alert
          }),
          finalResultArray = resultArray.map(result => {
            let alert = result && !result.error && result.value ? result : null
            return alert
          })

        return res({
          errors: geocodingErrorArray.filter(el => el !== null).map(el => el.error),
          success: finalResultArray.filter(el => el !== null).map(el => el.value)
        })
      }

      return parallel(reflectAll(tasks), callbackHandler)
    })
  }
}

module.exports = new GeocodingClient()
