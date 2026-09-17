import { NextFunction, Request, Response } from "express";
import { badRequestExxeption } from "../common/Exceptions/erorr.exception";
import tokenService from "../common/service/token.service";

export interface IUserRequest extends Request{
    user?:any
}


export const auth =(req:IUserRequest,res:Response,next:NextFunction)=>{
    if (!req.headers.authorization) {
        throw new badRequestExxeption('token is not found')
     }else{
        let [flag,token]=req.headers.authorization.split(' ')
        let decodedData = tokenService.decodeToken(token as string)
        if (!decodedData) {
          throw new badRequestExxeption('token is not valid')
        }else{
            req.user=decodedData
            next()
        }
  }
}