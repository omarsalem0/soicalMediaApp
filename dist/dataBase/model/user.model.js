"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_enums_1 = require("../../common/enums/user.enums");
const userSckema = new mongoose_1.default.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: String,
    confirmPassword: String,
    confirmEmail: Boolean,
    gender: {
        type: Number,
        default: user_enums_1.genderEnum.Male
    },
    provider: {
        type: Number,
        default: user_enums_1.providerEnum.System
    },
    role: {
        type: Number,
        default: user_enums_1.roleEnum.User
    }
});
userSckema.virtual('userName').set(function (value) {
    let [firstName, lastName] = value.split(" ");
    this.firstName = firstName;
    this.lastName = lastName;
}).get(function () {
    return ` ${this.firstName} ${this.lastName}`;
});
exports.userModel = mongoose_1.default.model('user', userSckema);
