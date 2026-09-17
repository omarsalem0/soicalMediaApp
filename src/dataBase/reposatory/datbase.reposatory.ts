import { Model, QueryFilter } from 'mongoose';
import { IUser } from './../../common/interface/user.interface';

export class dataBaseReposatory<TRawDoc> {
    constructor(private model:Model<TRawDoc>) {
        
    }
    async Create (data:Partial<TRawDoc>){
        return await this.model.create(data)
    }
    async findAll({select,populate, lean}:{
        select?:string,
        populate?:string,
        lean?:boolean 
    }){
        let query:any =await this.model.find()
        if (select) {
            query=await query.select(select)
        }
        if (populate) {
            query=await query.populate(populate)
        }
        if (lean) {
            query=await query.lean(lean)
        }
        return query

    }
    async findne ({filter,select,populate,lean}:{
        filter:Partial<TRawDoc>,
        select?:string,
        populate?:string,
        lean?:boolean
    }){
        let query:any =await this.model.findOne(filter)
        if (select) {
            query=await query.select(select)
        }
        if (populate) {
            query=await query.populate(populate)
        }
        if (lean) {
            query=await query.lean(lean)
        }
        return query
    }
     async findById ({id,select,populate,lean}:{
        id:string,
        select?:string,
        populate?:string,
        lean?:boolean
    }){
        let query:any =await this.model.findById(id)
        if (select) {
            query=await query.select(select)
        }
        if (populate) {
            query=await query.populate(populate)
        }
        if (lean) {
            query=await query.lean(lean)
        }
        return query
    }
    async update ({filter,data}:{
        filter:any,
        data:any
    }){
        return await this.model.updateOne(filter,data)
    }
    async deleteOne ({filter}:{
        filter:any
    }){
        return await this.model.deleteOne(filter)
    }

}