import { GraphQLBoolean, GraphQLEnumType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { genderEnum, providerEnum, roleEnum } from "../../../common/enums/user.enums";


export const oneUserType= new GraphQLObjectType({
    name:'typeOfuser',
    fields:{
           userName:{type:new GraphQLNonNull(GraphQLString)},
            firstName:{type:GraphQLString},
            lastName:{type:GraphQLString},
            email:{type:new GraphQLNonNull(GraphQLString)},
            password:{type:new GraphQLNonNull(GraphQLString)},
            phone:{type:GraphQLString},
            confirmEmail:{type:GraphQLBoolean},
            gender:{type:new GraphQLEnumType({
                name:"Gender",
                values:{
                    Male:{value:genderEnum.Male},
                    Female:{value:genderEnum.Female}
                }

            })},
            provider:{type:new GraphQLEnumType({
                name:"provider",
                values:{
                    Admin:{value:roleEnum.Admin},
                    User:{value:roleEnum.User}
                }
            })},
            role:{type:new GraphQLEnumType({
                name:"role",
                values:{
                    Admin:{value:providerEnum.System},
                    User:{value:providerEnum.Google}
                }
            })}
    }

})
export const AlluserType = new GraphQLObjectType({
    name:'allUser',
    fields:{
        message:{type:new GraphQLList(oneUserType)}
    }
})