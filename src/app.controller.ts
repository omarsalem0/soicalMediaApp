import type { Express, Request, Response } from "express";
import express from "express";
import { createHandler } from 'graphql-http/lib/use/express';
import { pipeline } from 'stream';
import { promisify } from "util";
import { badRequestExxeption } from "./common/Exceptions/erorr.exception";
import { redisService } from "./common/service/redis.service";
import s3Service from "./common/service/s3.service";
import { env } from "./config/env.service";
import { dataBaseConnection } from "./dataBase/connection";
import { globalHandelError } from "./middleware/errorHandulare";
import authRouter from "./module/auth/auth.controller";
import { schema } from "./module/gql/schema.gql";

export const bootStrap=async()=>{
    const S3GetFile=promisify(pipeline)
    const app:Express=express()
    app.use(express.json())
    // conection DB
    await dataBaseConnection()
    await redisService.handleConnection()
    // run gql
    app.all('/GraphQL',createHandler({schema:schema,context:(req)=>({req})}))    
    app.use('/auth',authRouter) 

    app.get('/uplouds/*path',async(req:Request,res:Response)=>{
       const {path} =req.params as {path:string[]}
       if (path.length==0){
        throw new badRequestExxeption('path not found')
       }
       let key= path.join('/')
       let {Body,ContentType} =await s3Service.getAsset({Key:key})
       S3GetFile(Body as NodeJS.ReadableStream,res)
       res.setHeader("Content-Type", ContentType || "application/octet-stream")
       res.set("Cross-Origin-Resource-Policy", "cross-origin")
       return res
    })
    app.delete('/delete-file',async (req:Request,res:Response)=>{
        let data= await s3Service.deleteAsset({Key:req.query.key as string})
        console.log(data);
    }) 
    app.get('/presSing',async(req:Request,res:Response)=>{
        let url = await s3Service.createPreSignUrl({})
        console.log(url);
        
    })
    
    app.use(globalHandelError)
    app.listen(env.port,()=>{
        console.log(`server is running as env.port ${env.port}`);
        
    })


}