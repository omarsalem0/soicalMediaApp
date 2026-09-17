import { userService } from "../user.service";

class userResolve {
    private userservice:userService
    constructor() {
     this.userservice=new userService        
    }
    Resolver=async()=>{
     let data =await this.userservice.getAllUser()
     return{
        message:data
     }   
    }
}
export const userresolver=new userResolve