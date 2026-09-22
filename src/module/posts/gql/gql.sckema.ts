import { GraphQLString } from "graphql"
import { AllPostType } from "./gql.types"
import { resolverGQL } from "./gql.resolver"



class postsSckemaGQL{
    constructor(){
    }
  regesterQuiry(){
    return{
        getAllPosts:{
            name:'getAllPosts',
            type:AllPostType,
            args:{
              title:{
                type:GraphQLString
              },
              content:{
                type:GraphQLString
              }
            },
            resolve:resolverGQL.getALLpost
       } 

    }
  }
    
}

export const PostsSckemaGQL =new postsSckemaGQL()