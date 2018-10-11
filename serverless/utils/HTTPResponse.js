"use strict"

const ERRORS = require("./Errors")

/** Factory class used to creating Alert mongoose document. */

class HTTPResponse {
  constructor() {
    this.development = process.env.STAGE === "development" || process.env.STAGE === "local"
  }

  isValidJSONString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  /**
   * Create a new API Gateway parseable response object, default status 501.
   * @param {Number} responseStatusCode - HTTP response status.
   * @param {Object} message - HTTP response body, should be a JSON parseable object.
   * @return {Object} - API Gateway parseable response object.
   */

  errorResponse(responseStatusCode, message, responseStackTrace) {
    
    let
      statusCode = responseStatusCode || 501,
      headers = {
        "Content-Type": "application/json"
      },
      isBase64Encoded = false,
      body,
      stackTrace

    if (this.development) {
      stackTrace = responseStackTrace
    }

    let jsonMessage


    if (this.isValidJSONString(message)) {
      jsonMessage = JSON.parse(message)
      // Reduce Array to Object, and insert in array (Some mongoose errors came this way)
      if (Array.isArray(jsonMessage) && jsonMessage[0] && jsonMessage[0].errors) {
        // If errors property doesn't exist, create it just for homogeneity
        jsonMessage = {
          errors: [].concat(jsonMessage[0].errors)
        }
      } else if (Array.isArray(jsonMessage)) {
        jsonMessage = {
          errors: jsonMessage,
          stackTrace
        }
      }
    } else {
      message = !message ? ERRORS.UNDEFINED : message
      jsonMessage = {
        errors: [{
          error: message,
          stackTrace
        }]
      }
    }

    // Stringify the response body because of the AWS Gateway paser
    try {
      body = JSON.stringify(jsonMessage)
    } catch (error) {
      body = JSON.stringify({
        errors: [ERRORS.UNHANDEABLE]
      })
    }

    return {
      statusCode,
      headers,
      body,
      isBase64Encoded
    }
  }

  /**
   * Create a new API Gateway parseable response object, default status 200.
   * @param {Number} responseStatusCode - HTTP response status.
   * @param {Object} message - HTTP response body, should be a JSON parseable object.
   * @return {Object} - API Gateway parseable response object.
   */

  successResponse(responseStatusCode, message, headers) {

    let body
    if (typeof message === "string") {
      body = message
    } else {
      body = JSON.stringify(message)
    }

    return {
      statusCode: responseStatusCode || 200,
      headers: Object.assign({}, {
        "Content-Type": "application/json"
      }, headers),
      body,
      isBase64Encoded: false
    }
  }
}

// ** Single instance pattern ** //
module.exports = new HTTPResponse()
