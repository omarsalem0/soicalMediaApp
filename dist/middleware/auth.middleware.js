"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const erorr_exception_1 = require("../common/Exceptions/erorr.exception");
const token_service_1 = __importDefault(require("../common/service/token.service"));
const auth = async (req, res, next) => {
    if (!req.headers.authorization) {
        throw new erorr_exception_1.badRequestExxeption('token is not found');
    }
    else {
        let [flag, token] = req.headers.authorization.split(' ');
        if (flag !== 'Bearer' || !token)
            throw new erorr_exception_1.unauthorizedExcepetion('invalid token format');
        let decodedData = await token_service_1.default.decodeToken(token);
        if (!decodedData) {
            throw new erorr_exception_1.badRequestExxeption('token is not valid');
        }
        else {
            req.user = decodedData;
            next();
        }
    }
};
exports.auth = auth;
