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
    set = async ({ key, value, ttl }) => {
        if (typeof value == 'object') {
            value = JSON.stringify(value);
        }
        return ttl ? await this.client.set(key, value, { EX: ttl }) : await this.client.set(key, value);
    };
    get = async (key) => {
        return await this.client.get(key);
    };
    mGet = async (...keys) => {
        return this.client.mGet(keys);
    };
    del = async (key) => {
        return await this.client.del(key);
    };
    ttl = async (key) => {
        return await this.client.ttl(key);
    };
    creatRevokToken = ({ userID, token }) => {
        return `revokToken::${userID}:${token}`;
    };
}
exports.redisService = new RedisService();
