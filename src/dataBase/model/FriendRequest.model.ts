import mongoose, { model, Schema, Types } from "mongoose";
import { FriendRequestEnums } from "../../common/enums/FriendRequest.enums";
import { number } from "zod";
import { IFriendRequest } from "../../common/interface/FriendRequest.interface";

const FriendRequestSckema =new Schema<IFriendRequest>({
    sender:{
        type:Schema.ObjectId,
        ref:"User",
        require:true
 },
    receiver:{
        type:Types.ObjectId,
        ref:"User",
        require:true
 },
 status:{
    type:Number,
    default:FriendRequestEnums.Pending
 }

},
{
    timestamps:true
})
export const friendRequestModedl= model<IFriendRequest>('FriendRequest',FriendRequestSckema)