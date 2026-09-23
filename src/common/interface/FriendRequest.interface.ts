import { Types } from "mongoose";
import { FriendRequestEnums } from "../enums/FriendRequest.enums";


export interface IFriendRequest{
     sender:Types.ObjectId,
     receiver:Types.ObjectId,
     status:FriendRequestEnums
}