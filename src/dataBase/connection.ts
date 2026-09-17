import mongoose from "mongoose"
import { env } from "../config/env.service"


export const dataBaseConnection =async()=>{
    await mongoose.connect(env.dataBaseUrl as string).then(()=>{
        console.log("data Base is connected");
        
    }).catch((err)=>{
        console.log(err);
        
    })

}