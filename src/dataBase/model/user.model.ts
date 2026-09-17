import { string } from './../../../node_modules/zod/src/v4/core/regexes';
import mongoose from "mongoose";
import { IUser } from "../../common/interface/user.interface";
import { genderEnum, providerEnum, roleEnum } from "../../common/enums/user.enums";

const userSckema= new mongoose.Schema<IUser>({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    phone:String,
    confirmPassword:String,
    confirmEmail:Boolean,
    gender:{
        type:Number,
        default:genderEnum.Male
    },
    provider:{
        type:Number,
        default:providerEnum.System
    },
    role:{
        type:Number,
        default:roleEnum.User
    }
})

userSckema.virtual('userName').set(function(value){
   let [firstName,lastName]=value.split(" ")
    this.firstName=firstName
    this.lastName=lastName
}).get(function(){
    return ` ${this.firstName} ${this.lastName}`
})

export const userModel =mongoose.model<IUser>('user',userSckema)
