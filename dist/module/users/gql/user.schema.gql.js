"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userschemaGQL = void 0;
const user_resolve_gql_1 = require("./user.resolve.gql");
const user_type_gql_1 = require("./user.type.gql");
class userSckemaGQL {
    constructor() {
    }
    regestarQuery() {
        return {
            helloWelcom: {
                name: 'getAllUser',
                type: user_type_gql_1.AlluserType,
                resolve: user_resolve_gql_1.userresolver.Resolver
            }
        };
    }
}
exports.userschemaGQL = new userSckemaGQL;
