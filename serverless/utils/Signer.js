"use strict"

const crypto = require("crypto");
const moment = require("moment");
const { google } = require("googleapis");
const fetch = require("./Fetch");
const OAuth2 = google.auth.OAuth2;
const oauth2 = google.oauth2("v2");
const IV_LENGTH = 16; //For AES, this is always 16
const algorithm = "aes-256-cbc";
const jws = require("jws");
const md5 = require("md5");
const _ = require("lodash");
const ERRORS = require("./Errors")

function encrypt(text, encryptSecret) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(algorithm, new Buffer(encryptSecret), iv);
  const encrypted = cipher.update(text);
  return iv.toString("hex") + ":" + Buffer.concat([encrypted, cipher.final()]).toString("hex");
}

function decrypt(text, encryptSecret) {
  const textParts = text.split(":");
  const iv = new Buffer(textParts.shift(), "hex");
  const encryptedText = new Buffer(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(algorithm, new Buffer(encryptSecret), iv);
  const decrypted = decipher.update(encryptedText);
  return Buffer.concat([decrypted, decipher.final()]).toString();
}

exports.nonValidSESVerification = (response, email) => {
  return !(response.VerificationAttributes &&
    response.VerificationAttributes[email] &&
    response.VerificationAttributes[email].VerificationStatus &&
    response.VerificationAttributes[email].VerificationStatus === "Success");
}
exports.parseChecksum = (row) => {
  const alert = _.clone(row, false);
  delete alert.timestamp;
  return md5(JSON.stringify(alert));
}

function isValidHeader(authorization) {
  return !authorization;
}

exports.sign = (payload, secret, encryptSecret) => {
  return jws.sign({
    header: { alg: "HS256" },
    payload: encrypt(JSON.stringify(payload), encryptSecret),
    secret
  });
};

exports.vibraniumLambdaShield = async (authorizationHeader, encryptSecret, updatingPassword = false) => {
  if (isValidHeader(authorizationHeader)) {
    return Promise.reject({ message: ERRORS.AUTH.NOT_FOUND, expire: false });
  }
  try {
    const splitted = authorizationHeader.split(" ")

    if (splitted.length === 2) {
      authorizationHeader = splitted[1]
    }

    let jwt = JSON.parse(decrypt(jws.decode(authorizationHeader).payload, encryptSecret));

    const now = moment().format();

    if (jwt.exp <= now) {
      return Promise.reject({ message: ERRORS.AUTH.EXPIRED, expire: true, id: jwt.id });
    }

    if ((!jwt.email || !jwt.password) && !updatingPassword) {
      return Promise.reject({ message: ERRORS.AUTH.STRICT_LOGIN, expire: false });
    }

    return jwt
  } catch (e) {
    return Promise.reject({ message: `${ERRORS.AUTH.UNAUTHORIZED} with error: ${e.message}`, expire: false });
  }
}

exports.weakLambdaShield = async (authorizationHeader, encryptSecret) => {
  if (isValidHeader(authorizationHeader)) {
    return null
  }
  try {
    const splitted = authorizationHeader.split(" ")

    if (splitted.length === 2) {
      authorizationHeader = splitted[1]
    }

    let jwt = JSON.parse(decrypt(jws.decode(authorizationHeader).payload, encryptSecret));

    const now = moment().format();

    if (jwt.exp <= now) {
      return Promise.reject({ message: ERRORS.AUTH.EXPIRED, expire: true, id: jwt.id });
    }

    return jwt
  } catch (e) {
    return Promise.reject({ message: `${ERRORS.AUTH.UNAUTHORIZED} with error: ${e.message}`, expire: false });
  }
}