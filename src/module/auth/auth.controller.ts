import { validation } from './../../common/service/validation.service';
import {Router } from "express";
import type { Request, Response } from "express";
import { uplouds } from "../../common/utils/multer/cloud";
import { MulterEnums } from "../../common/enums/multer.enums";
import s3Service from "../../common/service/s3.service";
import { loginSckema, signUpSckema } from "./auth.validation";
import { authService } from "./auth.service";
import { successResponce } from "../../common/Exceptions/success.ressponce";
import { badRequestExxeption } from '../../common/Exceptions/erorr.exception';

const router:Router=Router()

router.post('/Multer',validation(signUpSckema),async(req:Request,res:Response)=>{
    // let upludefilefroms3=await s3Service.uploudBigFile({file:req.file as Express.Multer.File})
    // console.log(upludefilefroms3);   
    console.log("done",req.body);
    
})
router.post('/sing-up',validation(signUpSckema),async(req:Request,res:Response)=>{
    let signUpUser=await authService.signUp(req.body)
    successResponce({
        res,
        message:'user Added successfuly',
        data:signUpUser,
    })
})
router.post('/login',validation(loginSckema),async(req:Request,res:Response)=>{
    let loginUser=await authService.login(req.body)
    successResponce({
        res,
        message:'user login successfuly',
        data:loginUser,
    })
})
router.post('/verify-account',async(req:Request,res:Response)=>{
   let verfiyUser =await authService.verifyAccount(req.body)
   successResponce({res,message:'verify Account',data:verfiyUser})
})
router.get('/get_RefreshToken',async(req:Request,res:Response)=>{
    let authorization =req.headers.authorization
    if(!authorization) throw new badRequestExxeption('Authorization header is required')
   let accessToken =await authService.getAccessToken(authorization)
   successResponce({res,message:"genearate-AccessToken succesfuly",data:accessToken,status:200})
    
})
export default router