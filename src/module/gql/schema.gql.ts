import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql"
import { userschemaGQL } from "../users/gql/user.schema.gql"


const query=new GraphQLObjectType({
            name:'RootQueryType',
            fields:{...userschemaGQL.regestarQuery()}
        })

export const schema=new GraphQLSchema({query
    })
