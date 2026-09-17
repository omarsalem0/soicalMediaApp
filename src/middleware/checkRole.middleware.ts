import { dataBaseReposatory } from './../dataBase/reposatory/datbase.reposatory';
import { NextFunction, Response } from "express"
import { IUserRequest } from "./auth.middleware"
import { userModel } from "../dataBase/model/user.model"
import { IUser } from "../common/interface/user.interface"
import {notFoundExcepetion, unauthorizedExcepetion } from '../common/Exceptions/erorr.exception';

let DataBaseReposatory=new dataBaseReposatory<IUser>(userModel)
export const ckeckRole=(roles:string[])=>{
    return async(req:IUserRequest,res:Response,next:NextFunction)=>{
     let existUser =await DataBaseReposatory.findById({id:req.user.id})
     if (!existUser) {
        throw new notFoundExcepetion('user not found')
     }
     let matchedRole =roles.find((role) => role ==existUser.role)
     if (matchedRole) {
        next()
     }
     throw new unauthorizedExcepetion('unauthorized')

    }
}