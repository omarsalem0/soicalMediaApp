import { JwtPayload } from "jsonwebtoken";
import { badRequestExxeption, MapGqlError } from "../../../common/Exceptions/erorr.exception";
import tokenService from "../../../common/service/token.service";
import { postService } from "../post.service";
import { validationGQL } from "../../../common/service/validation.service";
import { postsValidation } from "../posts.validation";

class ResolverGQL {
    private PostService:postService
    constructor() {
        this.PostService=new postService()
         this.getALLpost = this.getALLpost.bind(this)

    }
    async getALLpost(parent:any,args:any,context:any) {
        if (!context.req.headers.authorization) {
            throw MapGqlError(new badRequestExxeption('token is not found'))
        }
        validationGQL(postsValidation,args)
          let [flag,token]=context.req.headers.authorization.split(' ') 
          let decoded=await tokenService.decodeToken(token as string)
          let{id}=decoded as JwtPayload
          let postsData=await this.PostService.getAllPosts(id as string)
          return{
            message:postsData
          }
  
    }
}
export const resolverGQL=new ResolverGQL()