import { genderEnum, providerEnum, roleEnum } from "../enums/user.enums";

export interface IUser{
    userName:string,
    firstName?:string,
    lastName?:string,
    email:string,
    password:string,
    phone?:string,
    confirmPassword:string,
    confirmEmail:boolean,
    gender?:genderEnum,
    provider ?:providerEnum,
    role ?:roleEnum
}
