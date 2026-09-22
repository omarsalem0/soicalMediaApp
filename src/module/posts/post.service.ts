import { MapGqlError, notFoundExcepetion } from '../../common/Exceptions/erorr.exception';
import { IPost } from '../../common/interface/post.interface';
import { postModel } from '../../dataBase/model/post.model';
import { dataBaseReposatory } from './../../dataBase/reposatory/datbase.reposatory';

export class postService{
    private postReposatory:dataBaseReposatory<IPost>
    constructor(){
    this.postReposatory=new dataBaseReposatory<IPost>(postModel)
    }
    async getAllPosts(id:string){ 
        let postData=await this.postReposatory.findAll({filter:{userId:id}})
        if (!postData.length) {
            throw MapGqlError(new notFoundExcepetion('user dosnot have posts'))
        }
        return postData
     
    }
}