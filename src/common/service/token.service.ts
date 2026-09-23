import { env } from "../../config/env.service";
import { badRequestExxeption } from "../Exceptions/erorr.exception";
import jwt, { JwtHeader, JwtPayload } from "jsonwebtoken"
class TokenService {
    constructor(){
    }
    async generateToken(user:any){
        if(!user) throw new badRequestExxeption("payload is not found")
        let signature=undefined
        let refreshSignature=undefined
        let aud=undefined
        switch (user.role) {
            case 0:
                signature=env.adminSignature
                refreshSignature=env.RefreshAdminToken
                aud="Admin"
                break;
        
            default:
                signature=env.userSignature
                refreshSignature=env.refreshUserToken
                aud="User"
                break;
        }
        let accessToken=await jwt.sign({id:user._id},signature as string,{
            audience:aud,
            expiresIn:"30min"
        })
        let refreshToken =await jwt.sign({id:user._id},refreshSignature as string,{
            audience:aud,
            expiresIn:"1y"
        })
        console.log(accessToken);
        
        return {accessToken,refreshToken}
    }
    async decodeToken(token:string){
        try {
         let decoded =await jwt.decode(token) as JwtPayload
         if(!decoded) throw new badRequestExxeption('toke is not valid')
         let signature=undefined
         switch (decoded.aud) {
            case "Admin":
                signature=env.adminSignature
                break;
            default:
                signature=env.userSignature
                break;
         }
         let decodeData=await jwt.verify(token,signature as string)
         return decodeData          
        } catch (error) {
            throw new badRequestExxeption('token is not valid or expire',error)
        }
    }

     async decodeRefreshToken(token:string){
        try {
         let decoded =await jwt.decode(token) as JwtPayload
         if(!decoded) throw new badRequestExxeption('toke is not valid')
         let refreshSignature=undefined
         switch (decoded.aud) {
            case "Admin":
                refreshSignature=env.RefreshAdminToken
                break;
            default:
                refreshSignature=env.refreshUserToken
                break;
         }
         let decodeData=await jwt.verify(token,refreshSignature as string)
         return decodeData          
        } catch (error) {
            throw new badRequestExxeption('token is not decoded',error)
        }
    }
    async generateAccessToken(refreshToken:string){
      try {
         let decoded =await jwt.decode(refreshToken) as JwtPayload
         if(!decoded) throw new badRequestExxeption('toke is not valid')
         let Signature=undefined
         switch (decoded.aud) {
            case "Admin":
                Signature=env.adminSignature
                break;
            default:
                Signature=env.userSignature
                break;
         }
         let accessToken =await jwt.sign({id:decoded.id},Signature as string,{
            audience:decoded.aud,
            expiresIn:"30min"
         })
         return accessToken          
        } catch (error) {
            throw new badRequestExxeption('token is not decoded',error)
        }

    }
    

}
export default new TokenService()