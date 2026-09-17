"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisService = void 0;
const client_1 = require("@redis/client");
const env_service_1 = require("../../config/env.service");
class RedisService {
    client;
    constructor() {
        this.client = (0, client_1.createClient)({
            url: env_service_1.env.redisUrl
        });
        this.client.on('error', (err) => {
            console.log('Redis error:', err.message);
        });
    }
    async handleConnection() {
        try {
            await this.client.connect();
            console.log('Redis connected successfully');
        }
        catch (error) {
            console.log('redis connection error', error);
        }
    }
}
exports.redisService = new RedisService();
