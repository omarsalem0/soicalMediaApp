import { NextFunction, Request, Response } from "express"
import { ZodType } from "zod"
import { badRequestExxeption, MapGqlError } from "../Exceptions/erorr.exception"

type validationKey=keyof Request
type validationSckema=Partial <Record<validationKey,ZodType>>
export const validation=(sckema:validationSckema)=>{
   return (req:Request,res:Response,next:NextFunction)=>{
    let validationError=[]
     for (const key of Object.keys(sckema) as validationKey[]) {
        if (!sckema[key]) {
            throw new badRequestExxeption('validation key of sckem dosnot exsist')
        }
        let value = sckema[key].safeParse(req[key])
        if (!value.success) {
           validationError.push({
            key,
            issue:value.error.issues
           })
            }
        if (validationError.length>0) {
            throw new badRequestExxeption('validation error',validationError)
        }    
     
    }
    next()
    }
}
export const validationGQL=(sckema:ZodType,args:any)=>{
    let validationError=[]
    let value=sckema.safeParse(args)
    if (!value.success) {
        validationError.push({
            issue:value.error.issues
           })
    }
     if (validationError.length>0) {
            throw MapGqlError(new badRequestExxeption('validation error',validationError))
        } 
    return true    
}