import mongoose, { model, Schema, Types } from "mongoose";
import { IPost } from "../../common/interface/post.interface";


const PostSckema=new Schema<IPost>({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    userId:{
        type:Types.ObjectId,
        required:true,
        ref:'User'
    },
    comments:[{
        type:Types.ObjectId,
        required:true,
        ref:'User'
    }],
    liks:[{
        type:Types.ObjectId,
        required:true,
        ref:'User'
    }],
    tags:[{
        type:Types.ObjectId,
        required:true,
        ref:'User'
    }],
    createdAt:{
        type:Date,
        default:Date.now
    },
    deletedAt:{
        type:Date,
        default:null
    },
    restorteAt:{
        type:Date,
        default:null
    }
},
{
    timestamps:true,
    toJSON:{virtuals:true},
    strict:true
}
)
export const postModel=model<IPost>('Post',PostSckema)
