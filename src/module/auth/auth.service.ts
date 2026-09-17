import { IUser } from "../../common/interface/user.interface";
import { userModel } from "../../dataBase/model/user.model";
import { dataBaseReposatory } from "../../dataBase/reposatory/datbase.reposatory";

class AuthService {
    private userReposatory:dataBaseReposatory<IUser>
    constructor(){
        this.userReposatory=new dataBaseReposatory(userModel)
        
    }
}