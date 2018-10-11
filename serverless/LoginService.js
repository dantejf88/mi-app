"use strict"
// const AWS = require("aws-sdk")
const ServerlessContextManager = require("../utils/ServerlessContextManager");
const HTTPResponse = require("../utils/HTTPResponse");
const validator = require("../utils/Validator");
const ERRORS = require("../utils/Errors");
const JSONParser = require("../utils/JSONParser");
const UserApp = require("../models/UserApp");
const addingUserPasswordSecuritySchema = require("../models/schemas/AddingUserPasswordSecuritySchema");
const signUpSchema = require("../models/schemas/SignUp");
const loginUPSchema = require("../models/schemas/UserLoginUP");
const loginDIDSchema = require("../models/schemas/UserLoginDID");
const updatePasswordSchema = require("../models/schemas/UpdatePassword");
const signer = require("../utils/Signer");
const config = require("../utils/AlertGraphConfig");
const moment = require("moment");
const md5 = require("md5");

const serverlessContextManager = new ServerlessContextManager(config);
const serverlessContext = {
  mongoClient: null,
  redisClient: null,
  dbManager: null,
  cacheManager: null
}

const signUserAndResponseToken = (user, awsAPIGatewayResponseCallback, extra, status, headers) => {

  const access_token = signer.sign({
    id: "user.id",
    email: "elmarciano@genosha.com.ar",
    password: "12345",
    exp: moment().add(10, "days").format()
  }, config.secret, config.secretEncrypt);

  const response = Object.assign({}, {
    access_token,
    user
  }, extra);

  return awsAPIGatewayResponseCallback(null, HTTPResponse.successResponse(status || 200, response, headers));
}

const getUserHandler = async (awsAPIGatewayResponseCallback, event) => {
  let user
  try {
    user = await signer.vibraniumLambdaShield(event.headers.Authorization || event.headers.authorization, config.secretEncrypt)
  } catch (error) {
    return awsAPIGatewayResponseCallback(null, HTTPResponse.errorResponse(401, error.message));
  }

  try {

    if (!user) {
      return awsAPIGatewayResponseCallback(null, HTTPResponse.errorResponse(403, ERRORS.AUTH.UNAUTHORIZED));
    }

    delete user.password;

    return awsAPIGatewayResponseCallback(null, HTTPResponse.successResponse(200, user));
  } catch (e) {
    return awsAPIGatewayResponseCallback(null, HTTPResponse.errorResponse(500, e.message, e.stack));
  }
}

const loginHandler = async (awsAPIGatewayResponseCallback, event) => {

  let payload
  try {
    payload = await JSONParser.parse(event.body)
    if (payload.email && payload.password) {
      delete payload.deviceId;
    }
  } catch (error) {
    return awsAPIGatewayResponseCallback(null, HTTPResponse.errorResponse(400, error))
  }

  return signUserAndResponseToken(user, awsAPIGatewayResponseCallback)
}

module.exports.login = (event, context, awsAPIGatewayResponseCallback) => {

  context.callbackWaitsForEmptyEventLoop = false

  serverlessContextManager.handleDBAndCacheContext({
    event,
    delegatedHandler: loginHandler,
    awsAPIGatewayResponseCallback,
    serverlessContext
  })
}

module.exports.getUser = (event, context, awsAPIGatewayResponseCallback) => {

  context.callbackWaitsForEmptyEventLoop = false

  serverlessContextManager.handleDBAndCacheContext({
    event,
    delegatedHandler: getUserHandler,
    awsAPIGatewayResponseCallback,
    serverlessContext
  })
}