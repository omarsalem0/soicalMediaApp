import mongoose, { Types } from "mongoose";
import { IUser } from "../../common/interface/user.interface";
import { genderEnum, providerEnum, roleEnum } from "../../common/enums/user.enums";

const userSckema= new mongoose.Schema<IUser>({
    firstName:{
        type:String,
    },
    lastName:{type:String},
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:function(this){
            return this.provider === providerEnum.System
    }},
    phone:{
        type:String
    },
    profilePicture:{
        type:[String]
    },
    confirmEmail:{
        type:Boolean,
        default:false
},
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
    },
    friends:[{
        type:Types.ObjectId
    }]
}
)
userSckema.virtual('userName').set(function(value){
   let [firstName,lastName]=value.split(" ")
    this.firstName=firstName
    this.lastName=lastName
}).get(function(){
return `${this.firstName} ${this.lastName}`})

export const userModel =mongoose.model<IUser>('User',userSckema)
