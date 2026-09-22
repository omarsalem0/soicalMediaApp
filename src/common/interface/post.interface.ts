import { Types } from "mongoose";

export interface IPost{
    title:string,
    content:string,
    userId:Types.ObjectId,
    comments:Types.ObjectId[],
    liks:Types.ObjectId[],
    tags:Types.ObjectId[],
    createdAt:Date,
    deletedAt:Date,
    restorteAt:Date
}