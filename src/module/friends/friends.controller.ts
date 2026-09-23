import { Request, Router,Response } from "express";
import { auth, IUserRequest } from "../../middleware/auth.middleware";
import { friendsService } from "./friends.service";
import { successResponce } from "../../common/Exceptions/success.ressponce";
import { Types } from "mongoose";

const router:Router =Router()


router.post('/Friend_Request/:receiverId',auth,async(req:IUserRequest,res:Response)=>{
    let{id}=req.user 
    let RequestData=await friendsService.addFriendRequest(id,req.params.receiverId as string)
    successResponce({res,message:'friendRequest added successfuly',data:RequestData})
})
router.patch('/friend_Request/:requestId/accept',auth,async(req:IUserRequest,res:Response)=>{
    let{id}=req.user 
    let RequestData=await friendsService.addFriends(id,req.params.requestId as string)
    successResponce({res,message:'friendRequest added successfuly',data:RequestData})
})
router.patch('/friend_Request/:requestId/resject',auth,async(req:IUserRequest,res:Response)=>{
    let{id}=req.user 
    let RejecttFriend=await friendsService.rejectFriend(id,req.params.requestId as string)
    successResponce({res,message:'friendRequest is rejected successuly',data:RejecttFriend})
})
router.delete('/friend_Request/:friendId',auth,async(req:IUserRequest,res:Response)=>{
    let{id}=req.user 
    let deleteFriend=await friendsService.DeleteFriend(id,req.params.friendId as string)
    successResponce({res,message:'friendRequest is deleted successuly',data:deleteFriend})
})



export default router