"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../dataBase/model/user.model");
const datbase_reposatory_1 = require("../../dataBase/reposatory/datbase.reposatory");
class AuthService {
    userReposatory;
    constructor() {
        this.userReposatory = new datbase_reposatory_1.dataBaseReposatory(user_model_1.userModel);
    }
}
