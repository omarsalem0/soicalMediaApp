import { userresolver } from "./user.resolve.gql"
import { AlluserType, oneUserType } from "./user.type.gql"

class userSckemaGQL {
    constructor() {  
    }
    regestarQuery(){
        return {
                 helloWelcom:{
                    name:'getAllUser',
                    type:AlluserType,
                    resolve:userresolver.Resolver
                        }
                    }
    }
}
export const userschemaGQL=new userSckemaGQL