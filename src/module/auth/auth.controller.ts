import {Router } from "express";
import type { Request, Response } from "express";
import { uplouds } from "../../common/utils/multer/cloud";
import { MulterEnums } from "../../common/enums/multer.enums";
import s3Service from "../../common/service/s3.service";
import { validation } from "../../common/service/validation.service";
import { signUpSckema } from "./auth.validation";

const router:Router=Router()

router.post('/Multer',validation(signUpSckema),async(req:Request,res:Response)=>{
    // let upludefilefroms3=await s3Service.uploudBigFile({file:req.file as Express.Multer.File})
    // console.log(upludefilefroms3);   
    console.log("done",req.body);
    
})
export default router