import { NextFunction, Request, Response } from "express";
import { badRequestExxeption, unauthorizedExcepetion } from "../common/Exceptions/erorr.exception";
import tokenService from "../common/service/token.service";

export interface IUserRequest extends Request{
    user?:any
}


export const auth =async(req:IUserRequest,res:Response,next:NextFunction)=>{
    if (!req.headers.authorization) {
        throw new badRequestExxeption('token is not found')
     }else{
        let [flag,token]=req.headers.authorization.split(' ')
         if (flag !== 'Bearer' || !token) throw new unauthorizedExcepetion('invalid token format')
        let decodedData =await tokenService.decodeToken(token as string)
        if (!decodedData) {
          throw new badRequestExxeption('token is not valid')
        }else{
            req.user=decodedData
            next()
        }
  }
}

