"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const hassData_1 = require("./../../common/security/hassData");
const erorr_exception_1 = require("../../common/Exceptions/erorr.exception");
const semdEMail_1 = require("../../common/Mails/semdEMail");
const hassData_2 = require("../../common/security/hassData");
const user_model_1 = require("../../dataBase/model/user.model");
const datbase_reposatory_1 = require("../../dataBase/reposatory/datbase.reposatory");
const redis_service_1 = require("../../common/service/redis.service");
const token_service_1 = __importDefault(require("../../common/service/token.service"));
class AuthService {
    userReposatory;
    RedisService;
    constructor() {
        this.userReposatory = new datbase_reposatory_1.dataBaseReposatory(user_model_1.userModel);
        this.RedisService = redis_service_1.redisService;
    }
    async signUp(data) {
        if (!data) {
            throw new erorr_exception_1.badRequestExxeption('no data send or data not complete');
        }
        const { userName, email, password } = data;
        const exsistUser = await this.userReposatory.findone({ filter: { email } });
        if (exsistUser) {
            throw new erorr_exception_1.conflictException("user already exsist");
        }
        const hashPassword = await (0, hassData_2.hashData)(password);
        let otp = Math.floor(100000 + Math.random() * 900000);
        let addedUser = await this.userReposatory.Create({ userName, email, password: hashPassword, confirmEmail: false });
        if (!addedUser) {
            throw new erorr_exception_1.badRequestExxeption('user not added');
        }
        await this.RedisService.set({
            key: `otp:${addedUser._id}`,
            value: otp,
            ttl: 60 * 5
        });
        await (0, semdEMail_1.sendEmail)({
            to: email,
            subject: '<h1> verfiy your account </h1>',
            html: `<h2>the otp is ${otp}</h2>`
        });
        return addedUser;
    }
    async login(data) {
        if (!data) {
            throw new erorr_exception_1.badRequestExxeption('no data send or data not complete');
        }
        let { email, password } = data;
        let exsistUser = await this.userReposatory.findone({ filter: { email, confirmEmail: true } });
        console.log(exsistUser);
        if (!exsistUser) {
            throw new erorr_exception_1.notFoundExcepetion('email dosnot exsist');
        }
        let verifyPassword = await (0, hassData_1.verifyData)(password, exsistUser.password);
        console.log(verifyPassword);
        if (!verifyPassword) {
            throw new erorr_exception_1.badRequestExxeption('invild password');
        }
        let { accessToken, refreshToken } = await token_service_1.default.generateToken(exsistUser);
        console.log(accessToken);
        return { accessToken, refreshToken };
    }
    async verifyAccount(data) {
        let { email, otp } = data;
        let exsistUser = await this.userReposatory.findone({ filter: { email, confirmEmail: false } });
        if (!exsistUser) {
            throw new erorr_exception_1.notFoundExcepetion('email dosnot exsist');
        }
        let hashOtp = await this.RedisService.get(`otp:${exsistUser._id}`);
        if (!hashOtp) {
            throw new erorr_exception_1.badRequestExxeption('OTP expired or not found');
        }
        else {
            exsistUser.confirmEmail = true;
            await this.RedisService.del(`otp:${exsistUser._id}`);
            await exsistUser.save();
            return {
                message: 'user is verified successfuly',
                exsistUser
            };
        }
    }
    async getAccessToken(token) {
        let accessToken = await token_service_1.default.generateAccessToken(token);
        return accessToken;
    }
}
exports.authService = new AuthService();
