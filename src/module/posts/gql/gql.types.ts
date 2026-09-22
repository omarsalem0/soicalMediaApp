import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { oneUserType } from "../../users/gql/user.type.gql";


export const onePostType=new GraphQLObjectType({
    name:'TypeOfOnePost',
    fields:{
            title:{type:GraphQLString},
            content:{type:GraphQLString},
            userId:{type:GraphQLID},
            comments:{type:new GraphQLList(oneUserType)},
            liks:{type:new GraphQLList(oneUserType)},
            tags:{type:new GraphQLList(oneUserType)},
            createdAt:{type:GraphQLString},
            deletedAt:{type:GraphQLString},
            restorteAt:{type:GraphQLString}
    }
})
export const AllPostType=new GraphQLObjectType({
    name:'TypesOfALLpost',
    fields:{
        message:{type:new GraphQLList(onePostType)}
    }
})