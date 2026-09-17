"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userresolver = void 0;
const user_service_1 = require("../user.service");
class userResolve {
    userservice;
    constructor() {
        this.userservice = new user_service_1.userService;
    }
    Resolver = async () => {
        let data = await this.userservice.getAllUser();
        return {
            message: data
        };
    };
}
exports.userresolver = new userResolve;
