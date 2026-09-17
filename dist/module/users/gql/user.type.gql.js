"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlluserType = exports.oneUserType = void 0;
const graphql_1 = require("graphql");
const user_enums_1 = require("../../../common/enums/user.enums");
exports.oneUserType = new graphql_1.GraphQLObjectType({
    name: 'typeOfuser',
    fields: {
        userName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        firstName: { type: graphql_1.GraphQLString },
        lastName: { type: graphql_1.GraphQLString },
        email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        phone: { type: graphql_1.GraphQLString },
        confirmEmail: { type: graphql_1.GraphQLBoolean },
        gender: { type: new graphql_1.GraphQLEnumType({
                name: "Gender",
                values: {
                    Male: { value: user_enums_1.genderEnum.Male },
                    Female: { value: user_enums_1.genderEnum.Female }
                }
            }) },
        provider: { type: new graphql_1.GraphQLEnumType({
                name: "provider",
                values: {
                    Admin: { value: user_enums_1.roleEnum.Admin },
                    User: { value: user_enums_1.roleEnum.User }
                }
            }) },
        role: { type: new graphql_1.GraphQLEnumType({
                name: "role",
                values: {
                    Admin: { value: user_enums_1.providerEnum.System },
                    User: { value: user_enums_1.providerEnum.Google }
                }
            }) }
    }
});
exports.AlluserType = new graphql_1.GraphQLObjectType({
    name: 'allUser',
    fields: {
        message: { type: new graphql_1.GraphQLList(exports.oneUserType) }
    }
});
