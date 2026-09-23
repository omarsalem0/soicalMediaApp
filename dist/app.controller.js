"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootStrap = void 0;
const express_1 = __importDefault(require("express"));
const express_2 = require("graphql-http/lib/use/express");
const stream_1 = require("stream");
const util_1 = require("util");
const erorr_exception_1 = require("./common/Exceptions/erorr.exception");
const redis_service_1 = require("./common/service/redis.service");
const s3_service_1 = __importDefault(require("./common/service/s3.service"));
const env_service_1 = require("./config/env.service");
const connection_1 = require("./dataBase/connection");
const errorHandulare_1 = require("./middleware/errorHandulare");
const auth_controller_1 = __importDefault(require("./module/auth/auth.controller"));
const friends_controller_1 = __importDefault(require("./module/friends/friends.controller"));
const schema_gql_1 = require("./module/gql/schema.gql");
const bootStrap = async () => {
    const S3GetFile = (0, util_1.promisify)(stream_1.pipeline);
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    await (0, connection_1.dataBaseConnection)();
    await redis_service_1.redisService.handleConnection();
    app.all('/GraphQL', (0, express_2.createHandler)({ schema: schema_gql_1.schema, context: (req) => ({ req }) }));
    app.use('/auth', auth_controller_1.default);
    app.use('/friends', friends_controller_1.default);
    app.get('/uplouds/*path', async (req, res) => {
        const { path } = req.params;
        if (path.length == 0) {
            throw new erorr_exception_1.badRequestExxeption('path not found');
        }
        let key = path.join('/');
        let { Body, ContentType } = await s3_service_1.default.getAsset({ Key: key });
        S3GetFile(Body, res);
        res.setHeader("Content-Type", ContentType || "application/octet-stream");
        res.set("Cross-Origin-Resource-Policy", "cross-origin");
        return res;
    });
    app.delete('/delete-file', async (req, res) => {
        let data = await s3_service_1.default.deleteAsset({ Key: req.query.key });
        console.log(data);
    });
    app.get('/presSing', async (req, res) => {
        let url = await s3_service_1.default.createPreSignUrl({});
        console.log(url);
    });
    app.use(errorHandulare_1.globalHandelError);
    app.listen(env_service_1.env.port, () => {
        console.log(`server is running as env.port ${env_service_1.env.port}`);
    });
};
exports.bootStrap = bootStrap;
