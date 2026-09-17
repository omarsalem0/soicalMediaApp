import { createClient } from '@redis/client';
import {RedisClientType} from "redis"
import { env } from "../../config/env.service"
import { Types } from 'mongoose';

class RedisService  {
    private client:RedisClientType
    constructor(){
        this.client=createClient({
            url:env.redisUrl as string
        })
      this.client.on('error', (err) => {
         console.log('Redis error:', err.message);
    });
    }

    async handleConnection(){
     try {
        await this.client.connect()
        console.log('Redis connected successfully');
        
   
     } catch (error) {
        console.log('redis connection error',error);        
     }
    }
    set =async({key,value,ttl}:{
        key:string,
        value:any,
        ttl?:number
    })=>{
        if (typeof value =='object') {
            value=JSON.stringify(value)
        }
    return ttl?  await this.client.set(key,value,{EX:ttl}) :await this.client.set(key,value)
}
    get =async(key:string)=>{
    return await this.client.get(key)
    }
    mGet=async(...keys:string[])=>{
        return this.client.mGet(keys)
    }
    del=async(key:string)=>{
        return await this.client.del(key)
    }
    ttl=async(key:string)=>{
        return await this.client.ttl(key)
    }
    creatRevokToken=({userID,token}:{
        userID:Types.ObjectId,
        token:string
    })=>{
        return `revokToken::${userID}:${token}`
    }
}

export const redisService=new RedisService ()