"use strict"

const mdb = process.env.MONGO_DB || "development"
const mdbHostAndPort = process.env.MONGO_HOST || "localhost:27018"
const mdbPassword = process.env.MONGO_PASSWORD || ""
const mdbUser = process.env.MONGO_USERNAME || ""
const domain = process.env.DOMAIN || "http://localhost:3000/api/v1"
const operationsDomain = process.env.OPERATIONS_DOMAIN || "http://localhost:7001/"
const redisHostAndPort = process.env.REDIS_HOST || "localhost:6379"
const redisPassword = process.env.REDIS_PASSWORD || ""
const redisUser = process.env.REDIS_USERNAME || ""
const redisDBNumber = process.env.REDIS_DB || "0"
const secret = process.env.SECRET;
const secretEncrypt = process.env.SECRET_ENCRYPT;
const googleId = process.env.GOOGLE_ID;
const googleSecret = process.env.GOOGLE_SECRET;
const accessKey = process.env.AWS_SES_ACCESS_KEY;
const secretKey = process.env.AWS_SES_SECRET_KEY;
const sesRegion = process.env.AWS_SES_REGION;

module.exports = {
    mdb,
    mdbHostAndPort,
    mdbPassword,
    mdbUser,
    redisHostAndPort,
    redisPassword,
    redisUser,
    redisDBNumber,
    domain,
    operationsDomain,
    secret,
    secretEncrypt,
    googleId,
    googleSecret,
    isLocalEnv: process.env.STAGE === "local" ? true : false,
    isTestingEnv: process.env.TESTING === "true",
    aws: {
        accessKey,
        secretKey,
        sesRegion
    }
};
