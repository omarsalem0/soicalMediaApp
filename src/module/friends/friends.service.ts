import { Types } from "mongoose";
import { badRequestExxeption, notFoundExcepetion } from "../../common/Exceptions/erorr.exception";
import { IFriendRequest } from "../../common/interface/FriendRequest.interface";
import { friendRequestModedl } from "../../dataBase/model/FriendRequest.model";
import { dataBaseReposatory } from "../../dataBase/reposatory/datbase.reposatory";
import { IUser } from "../../common/interface/user.interface";
import { userModel } from "../../dataBase/model/user.model";
import { FriendRequestEnums } from "../../common/enums/FriendRequest.enums";

class FriendsSerice {
    private frindesReposatory:dataBaseReposatory<IFriendRequest>
    private userReposatory:dataBaseReposatory<IUser>
    constructor() {
        this.frindesReposatory=new dataBaseReposatory(friendRequestModedl)
        this.userReposatory=new dataBaseReposatory(userModel)
    }

    async addFriendRequest(senderId:Types.ObjectId,receiverId:string){
        if (senderId===new Types.ObjectId(receiverId)) {
            throw new badRequestExxeption("You cannot send friend request to yourself")
        }
        let addedRequest=await this.frindesReposatory.Create({sender:senderId,receiver:new Types.ObjectId(receiverId)})
        if (!addedRequest) {
            throw new badRequestExxeption('friendRequest not added')
        }
        return addedRequest
    }
    async addFriends(userId:Types.ObjectId,requestId:string){
      let existUser=await this.userReposatory.findById({id:userId})
      if (!existUser) {
        throw new notFoundExcepetion("user dosnot exsist")
      }

      let existRequest=await this.frindesReposatory.findone({filter:{_id:requestId,status:FriendRequestEnums.Pending}})

      if (!existRequest) {
        throw new notFoundExcepetion("Request dosnot exsist")
      }
      if (String(userId)!==String(existRequest.receiver)) {
       throw new badRequestExxeption("recevireId from request not equel userId")
      }
       let matchedFriend =existUser.friends.find((friend:Types.ObjectId) => friend == existRequest.sender)
      if (matchedFriend) {
        throw new badRequestExxeption("friend request already exist")
      }
      existRequest.status=FriendRequestEnums.Accepted
      await existRequest.save()
      let addedFiendFromReceiver =await this.userReposatory.update({
        filter:{_id:userId},
        data:{
             $addToSet:{
                friends:existRequest.sender
            }
        }
      })
      let addedFiendFromSender =await this.userReposatory.update({
        filter:{_id:existRequest.sender},
        data:{
             $addToSet:{
                friends:existRequest.receiver
            }
        }
      })
      if (addedFiendFromReceiver.modifiedCount && addedFiendFromSender.modifiedCount) {
        return {
            message:"friend added from to user successfuly"
        }
      }
      return {
        message:"user dosnot added successuly"
      }
    }
    async rejectFriend(userId:Types.ObjectId,requestId:string){
            let existUser=await this.userReposatory.findById({id:userId})
      if (!existUser) {
        throw new notFoundExcepetion("user dosnot exsist")
      }

      let existRequest=await this.frindesReposatory.findone({filter:{_id:requestId,status:FriendRequestEnums.Pending}})
      if (!existRequest) {
        throw new notFoundExcepetion("Request dosnot exsist")
      }
      if (String(userId)!==String(existRequest.receiver)) {
       throw new badRequestExxeption("recevireId from request not equel userId")
      }
       let matchedFriend =existUser.friends.find((friend:Types.ObjectId) => friend == existRequest.sender)
      if (matchedFriend) {
        throw new badRequestExxeption("friend request already exist")
      }
      existRequest.status=FriendRequestEnums.Rejected
      await existRequest.save()
    }
    async DeleteFriend(userId:Types.ObjectId,friendId:string){
      let existUser=await this.userReposatory.findById({id:userId})
      if (!existUser) {
        throw new notFoundExcepetion("user dosnot exsist")
      }      
      let matchedFriend =existUser.friends.find((friend:Types.ObjectId) => String(friend) == String(friendId))

      if (!matchedFriend) {
        throw new badRequestExxeption("friend dosnot exsist for you")
      }
      let deltedFriendFromUser =await this.userReposatory.update({filter:{
           _id:userId,
      },
    data:{
          $pull: {
            friends: new Types.ObjectId(friendId)
    }
}

    })
    let deltedFriendFromFriend =await this.userReposatory.update({filter:{
           _id:friendId,
      },
        data:{
            $pull: {
                friends: new Types.ObjectId(userId)
        }
}

    })
     if (deltedFriendFromUser.modifiedCount && deltedFriendFromFriend.modifiedCount) {
        return {
            message:"friend deleted from author successfuly"
        }
      }
      return {
        message:"user dosnot delted successuly"
      }
    }

    }

export const friendsService =new FriendsSerice()