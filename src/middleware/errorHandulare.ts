import { NextFunction, Request, Response } from "express";



export const globalHandelError=(err:any,req:Request,res:Response,next:NextFunction)=>{
   return res.status(err.status || 500).json({
        messsage:err.messsage,
        stack:err.stack,
        cause:err.cause,
        err
        
    })

}