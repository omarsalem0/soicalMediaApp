"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_model_1 = require("../../dataBase/model/user.model");
const datbase_reposatory_1 = require("../../dataBase/reposatory/datbase.reposatory");
class userService {
    userReposatory;
    constructor() {
        this.userReposatory = new datbase_reposatory_1.dataBaseReposatory(user_model_1.userModel);
    }
    async getAllUser() {
        let userData = this.userReposatory.findAll({});
        console.log(userData);
        return userData;
    }
}
exports.userService = userService;
