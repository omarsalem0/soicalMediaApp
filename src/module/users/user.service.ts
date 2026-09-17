import { IUser } from './../../common/interface/user.interface';
import { userModel } from "../../dataBase/model/user.model"
import { dataBaseReposatory } from "../../dataBase/reposatory/datbase.reposatory"

export class userService {
    private userReposatory:dataBaseReposatory<IUser>
    constructor(){
        this.userReposatory=new dataBaseReposatory(userModel)  
    }
    async getAllUser(){
        let userData=this.userReposatory.findAll({})
        console.log(userData);
        return userData
        

    }
}
