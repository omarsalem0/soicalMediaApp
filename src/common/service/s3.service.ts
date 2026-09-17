import { createReadStream } from 'fs';
import { DeleteObjectCommand, GetObjectCommand, ObjectCannedACL, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { env } from "../../config/env.service";
import {MulterEnums} from '../../common/enums/multer.enums'
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

class s3Service {
    private client:S3Client
    constructor(){
        this.client=new S3Client({
            region:'us-east-1',
            credentials:{
                accessKeyId:env.accessKey_AWS as string,
                secretAccessKey:env.secret_AccessKey_AWS as string
            }
        })
    }
     async uploudFile({
        storageKey=MulterEnums.memoryStorage,
        Bucket=env.AWS_Bucket_Name,
        path='general',
        file,
        ACL=ObjectCannedACL.private,
        ContentType
    }:{
        storageKey?:MulterEnums
        Bucket ?:string,
        path?:string,
        file:Express.Multer.File,
        ACL?:ObjectCannedACL,
        ContentType?:string
    }){
        const key = `socialMedia/${path}/${Math.round(Math.random() *
1E9)}-${file.originalname}`;
     let result=await this.client.send( new PutObjectCommand({
        Bucket,
        Key:key,
        Body: storageKey===MulterEnums.memoryStorage? file.buffer : createReadStream(file.path),
        ACL,
        ContentType:file.mimetype || ContentType
     })
     )     
     return key
    }
    async uploudBigFile({
        storageKey=MulterEnums.memoryStorage,
        Bucket=env.AWS_Bucket_Name,
        path='general',
        file,
        ACL=ObjectCannedACL.private,
        ContentType,
        partSize=5
    }:{
        storageKey?:MulterEnums
        Bucket ?:string,
        path?:string,
        file:Express.Multer.File,
        ACL?:ObjectCannedACL,
        ContentType?:string,
        partSize?:number
    }){
        const key = `socialMedia/${path}/${Math.round(Math.random() *
1E9)}-${file.originalname}`;
     let uploadFile=await new Upload({
        client:this.client,
        params:{
            Bucket,
            Key:key,
           Body: storageKey===MulterEnums.memoryStorage? file.buffer : createReadStream(file.path),
           ACL,
           ContentType:file.mimetype || ContentType
        },
        partSize:partSize * 1024 * 1024
     })
     uploadFile.on('httpUploadProgress',(process)=>{
        console.log((process.loaded as number)/ (process.total as number) *100);
     })
     return await uploadFile.done()
    }
    async createPreSignUrl({
        Bucket=env.AWS_Bucket_Name,
        path='general',
        // key,
        ContentType,
        Expires=2*60,
        Originalname
    }:{
        Bucket ?:string,
        path ?:string,
        // key ?:string,
        ContentType ?:string,
        Expires ?:number,
        Originalname ?:string

    }):Promise<string>{
      const key =`socialMedia/${path}/${Math.round(Math.random()*1E9)}-${Originalname}`;
      const result= new PutObjectCommand({
        Bucket,
        Key:key,
        ContentType
    })
    const url=await getSignedUrl(this.client,result,{
        expiresIn:Expires
    })
    return url

    }
    async getAsset({
        Bucket=env.AWS_Bucket_Name,
        Key
    }:{
        Bucket?:string,
        Key:string
    }){
        const file =new GetObjectCommand({
            Bucket,
            Key
        })
        return await this.client.send(file)
    }
    async deleteAsset({
        Bucket=env.AWS_Bucket_Name,
        Key
    }:{
        Bucket?:string,
        Key:string
    }){
        const result= new DeleteObjectCommand({
            Bucket,
            Key
        })        
        return await this.client.send(result)
    }
}

export default new s3Service