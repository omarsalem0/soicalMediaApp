import { verifyData } from './../../common/security/hassData';
import { conflictException,badRequestExxeption, notFoundExcepetion } from "../../common/Exceptions/erorr.exception";
import { IUser } from "../../common/interface/user.interface";
import { sendEmail } from "../../common/Mails/semdEMail";
import { hashData } from "../../common/security/hassData";
import { userModel } from "../../dataBase/model/user.model";
import { dataBaseReposatory } from "../../dataBase/reposatory/datbase.reposatory";
import {redisService} from '../../common/service/redis.service'
import TokenService from '../../common/service/token.service'
import { loginDTO, singUpDTO } from "./auth.dto";
class AuthService {
    private userReposatory:dataBaseReposatory<IUser>
    private RedisService:typeof redisService
    constructor(){
        this.userReposatory=new dataBaseReposatory(userModel)
        this.RedisService=redisService
        
    }
    async signUp(data:singUpDTO){
         if(!data) {
       throw new badRequestExxeption('no data send or data not complete')}
        const {userName,email,password}=data
        const exsistUser =await this.userReposatory.findone({filter:{email}})
        if (exsistUser) {
            throw new conflictException("user already exsist")
        }
        const hashPassword =await hashData(password)
        let otp =Math.floor(100000+Math.random()*900000)
        let addedUser =await this.userReposatory.Create({userName,email,password:hashPassword,confirmEmail:false})

        if (!addedUser) {
            throw new badRequestExxeption('user not added')
        }
        await this.RedisService.set({
        key:`otp:${addedUser._id}`,
        value:otp,
        ttl:60*5
    })
    await sendEmail({
        to:email,
        subject:'<h1> verfiy your account </h1>',
        html:`<h2>the otp is ${otp}</h2>`
    })

    return addedUser  
    }
    async login (data:loginDTO){
        if(!data) {
       throw new badRequestExxeption('no data send or data not complete')}
     let {email,password}=data
     let exsistUser = await this.userReposatory.findone({filter:{email,confirmEmail:true}})
     console.log(exsistUser);
     
     if (!exsistUser) {
        throw new notFoundExcepetion('email dosnot exsist')
     }
     let verifyPassword =await verifyData(password,exsistUser.password)
     console.log(verifyPassword);
     
     if (!verifyPassword) {
        throw new badRequestExxeption('invild password')
     }
     let {accessToken,refreshToken}=await TokenService.generateToken(exsistUser)
     console.log(accessToken);
     
     return {accessToken,refreshToken}

    }
    async verifyAccount(data:any){
        let{email,otp}=data
        let exsistUser=await this.userReposatory.findone({filter:{email,confirmEmail:false}})
        if (!exsistUser) {
            throw new notFoundExcepetion('email dosnot exsist')
        }
        let hashOtp =await this.RedisService.get(`otp:${exsistUser._id}`) 
        if (!hashOtp) {
            throw new badRequestExxeption('OTP expired or not found')
        }
      else{
          exsistUser.confirmEmail=true
          await this.RedisService.del(`otp:${exsistUser._id}`) 
         await exsistUser.save()
         return {
            message :'user is verified successfuly',
            exsistUser
         }
      }
    }
    async getAccessToken(token:string){
        let accessToken=await TokenService.generateAccessToken(token)
        return accessToken
    }
}
export const authService=new AuthService()