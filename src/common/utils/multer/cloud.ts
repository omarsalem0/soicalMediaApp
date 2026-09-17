import multer from 'multer';
import { MulterEnums } from '../../enums/multer.enums';
import {tmpdir} from "os"

export const uplouds=({storageKey=MulterEnums.memoryStorage}:{
    storageKey?:MulterEnums
})=>{
   try {
     const storage= storageKey==MulterEnums.memoryStorage? multer.memoryStorage() : multer.diskStorage({
        destination:function (req,file,cb){
            cb(null,tmpdir())
        },
        filename:function(req,file,cb){
            let fileName=Date.now()+'-'+file.originalname
            cb(null,fileName)
        }

    })   
    return multer({storage})
   } catch (error) {
      throw new Error('multer is error uploud',{cause:error}) 
}
}