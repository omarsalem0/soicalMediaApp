"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(`./src/.env.${process.env.ENV_MOOD}`) });
const port = process.env.PORT;
const dataBaseUrl = process.env.DATABASEURL;
const env_mood = process.env.ENV_MOOD;
const saltRound = process.env.SALTROUND;
const userSignature = process.env.USER_SIGNATURE;
const adminSignature = process.env.ADMIN_SIGNATURE;
const refreshUserToken = process.env.REFRESH_USER_TOKEN;
const RefreshAdminToken = process.env.REFRESH_ADMIN_TOKEN;
const googleEmail = process.env.GOOGLE_ACOUNCT_EMAIL;
const googleAppPassword = process.env.GOOGLE_APP_PASSWORD;
const serverUrl = process.env.SERVER_URL;
const redisUrl = process.env.REDIS_URL;
const client_Id = process.env.CLIENT_ID;
const accessKey_AWS = process.env.ACCESS_KEY_AWS;
const secret_AccessKey_AWS = process.env.SECRET_ACCESS_KEY_AWS;
const AWS_Bucket_Name = process.env.AWS_BUCKET_NAME;
exports.env = {
    port,
    dataBaseUrl,
    env_mood,
    saltRound,
    userSignature,
    adminSignature,
    refreshUserToken,
    RefreshAdminToken,
    googleEmail,
    googleAppPassword,
    serverUrl,
    redisUrl,
    client_Id,
    accessKey_AWS,
    secret_AccessKey_AWS,
    AWS_Bucket_Name
};
