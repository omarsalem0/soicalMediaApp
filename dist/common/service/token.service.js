"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_service_1 = require("../../config/env.service");
const erorr_exception_1 = require("../Exceptions/erorr.exception");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenService {
    constructor() {
    }
    async generateToken(user) {
        if (!user)
            throw new erorr_exception_1.badRequestExxeption("payload is not found");
        let signature = undefined;
        let refreshSignature = undefined;
        let aud = undefined;
        switch (user.role) {
            case 0:
                signature = env_service_1.env.adminSignature;
                refreshSignature = env_service_1.env.RefreshAdminToken;
                aud = "Admin";
                break;
            default:
                signature = env_service_1.env.userSignature;
                refreshSignature = env_service_1.env.refreshUserToken;
                aud = "User";
                break;
        }
        let accessToken = await jsonwebtoken_1.default.sign({ id: user._id }, signature, {
            audience: aud,
            expiresIn: "30min"
        });
        let refreshToken = await jsonwebtoken_1.default.sign({ id: user._id }, refreshSignature, {
            audience: aud,
            expiresIn: "1y"
        });
        console.log(accessToken);
        return { accessToken, refreshToken };
    }
    async decodeToken(token) {
        try {
            let decoded = await jsonwebtoken_1.default.decode(token);
            if (!decoded)
                throw new erorr_exception_1.badRequestExxeption('toke is not valid');
            let signature = undefined;
            switch (decoded.aud) {
                case "Admin":
                    signature = env_service_1.env.adminSignature;
                    break;
                default:
                    signature = env_service_1.env.userSignature;
                    break;
            }
            let decodeData = await jsonwebtoken_1.default.verify(token, signature);
            return decodeData;
        }
        catch (error) {
            throw new erorr_exception_1.badRequestExxeption('token is not decoded', error);
        }
    }
    async decodeRefreshToken(token) {
        try {
            let decoded = await jsonwebtoken_1.default.decode(token);
            if (!decoded)
                throw new erorr_exception_1.badRequestExxeption('toke is not valid');
            let refreshSignature = undefined;
            switch (decoded.aud) {
                case "Admin":
                    refreshSignature = env_service_1.env.RefreshAdminToken;
                    break;
                default:
                    refreshSignature = env_service_1.env.refreshUserToken;
                    break;
            }
            let decodeData = await jsonwebtoken_1.default.verify(token, refreshSignature);
            return decodeData;
        }
        catch (error) {
            throw new erorr_exception_1.badRequestExxeption('token is not decoded', error);
        }
    }
    async generateAccessToken(refreshToken) {
        try {
            let decoded = await jsonwebtoken_1.default.decode(refreshToken);
            if (!decoded)
                throw new erorr_exception_1.badRequestExxeption('toke is not valid');
            let Signature = undefined;
            switch (decoded.aud) {
                case "Admin":
                    Signature = env_service_1.env.adminSignature;
                    break;
                default:
                    Signature = env_service_1.env.userSignature;
                    break;
            }
            let accessToken = await jsonwebtoken_1.default.sign({ id: decoded.id }, Signature, {
                audience: decoded.aud,
                expiresIn: "30min"
            });
            return accessToken;
        }
        catch (error) {
            throw new erorr_exception_1.badRequestExxeption('token is not decoded', error);
        }
    }
}
exports.default = new TokenService();
