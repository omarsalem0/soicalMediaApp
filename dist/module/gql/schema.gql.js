"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const user_schema_gql_1 = require("../users/gql/user.schema.gql");
const gql_sckema_1 = require("../posts/gql/gql.sckema");
const query = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...user_schema_gql_1.userschemaGQL.regestarQuery(),
        ...gql_sckema_1.PostsSckemaGQL.regesterQuiry()
    }
});
exports.schema = new graphql_1.GraphQLSchema({ query
});
