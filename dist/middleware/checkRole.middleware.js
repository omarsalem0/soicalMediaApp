"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ckeckRole = void 0;
const datbase_reposatory_1 = require("./../dataBase/reposatory/datbase.reposatory");
const user_model_1 = require("../dataBase/model/user.model");
const erorr_exception_1 = require("../common/Exceptions/erorr.exception");
let DataBaseReposatory = new datbase_reposatory_1.dataBaseReposatory(user_model_1.userModel);
const ckeckRole = (roles) => {
    return async (req, res, next) => {
        let existUser = await DataBaseReposatory.findById({ id: req.user.id });
        if (!existUser) {
            throw new erorr_exception_1.notFoundExcepetion('user not found');
        }
        let matchedRole = roles.find((role) => role == existUser.role);
        if (matchedRole) {
            next();
        }
        throw new erorr_exception_1.unauthorizedExcepetion('unauthorized');
    };
};
exports.ckeckRole = ckeckRole;
