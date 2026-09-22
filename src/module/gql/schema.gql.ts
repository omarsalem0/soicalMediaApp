import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql"
import { userschemaGQL } from "../users/gql/user.schema.gql"
import { PostsSckemaGQL } from "../posts/gql/gql.sckema"


const query=new GraphQLObjectType({
            name:'RootQueryType',
            fields:{
                ...userschemaGQL.regestarQuery(),
                ...PostsSckemaGQL.regesterQuiry()
            }
        })

export const schema=new GraphQLSchema({query
    })
