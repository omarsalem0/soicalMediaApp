"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const client_s3_1 = require("@aws-sdk/client-s3");
const env_service_1 = require("../../config/env.service");
const multer_enums_1 = require("../../common/enums/multer.enums");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
class s3Service {
    client;
    constructor() {
        this.client = new client_s3_1.S3Client({
            region: 'us-east-1',
            credentials: {
                accessKeyId: env_service_1.env.accessKey_AWS,
                secretAccessKey: env_service_1.env.secret_AccessKey_AWS
            }
        });
    }
    async uploudFile({ storageKey = multer_enums_1.MulterEnums.memoryStorage, Bucket = env_service_1.env.AWS_Bucket_Name, path = 'general', file, ACL = client_s3_1.ObjectCannedACL.private, ContentType }) {
        const key = `socialMedia/${path}/${Math.round(Math.random() *
            1E9)}-${file.originalname}`;
        let result = await this.client.send(new client_s3_1.PutObjectCommand({
            Bucket,
            Key: key,
            Body: storageKey === multer_enums_1.MulterEnums.memoryStorage ? file.buffer : (0, fs_1.createReadStream)(file.path),
            ACL,
            ContentType: file.mimetype || ContentType
        }));
        return key;
    }
    async uploudBigFile({ storageKey = multer_enums_1.MulterEnums.memoryStorage, Bucket = env_service_1.env.AWS_Bucket_Name, path = 'general', file, ACL = client_s3_1.ObjectCannedACL.private, ContentType, partSize = 5 }) {
        const key = `socialMedia/${path}/${Math.round(Math.random() *
            1E9)}-${file.originalname}`;
        let uploadFile = await new lib_storage_1.Upload({
            client: this.client,
            params: {
                Bucket,
                Key: key,
                Body: storageKey === multer_enums_1.MulterEnums.memoryStorage ? file.buffer : (0, fs_1.createReadStream)(file.path),
                ACL,
                ContentType: file.mimetype || ContentType
            },
            partSize: partSize * 1024 * 1024
        });
        uploadFile.on('httpUploadProgress', (process) => {
            console.log(process.loaded / process.total * 100);
        });
        return await uploadFile.done();
    }
    async createPreSignUrl({ Bucket = env_service_1.env.AWS_Bucket_Name, path = 'general', ContentType, Expires = 2 * 60, Originalname }) {
        const key = `socialMedia/${path}/${Math.round(Math.random() * 1E9)}-${Originalname}`;
        const result = new client_s3_1.PutObjectCommand({
            Bucket,
            Key: key,
            ContentType
        });
        const url = await (0, s3_request_presigner_1.getSignedUrl)(this.client, result, {
            expiresIn: Expires
        });
        return url;
    }
    async getAsset({ Bucket = env_service_1.env.AWS_Bucket_Name, Key }) {
        const file = new client_s3_1.GetObjectCommand({
            Bucket,
            Key
        });
        return await this.client.send(file);
    }
    async deleteAsset({ Bucket = env_service_1.env.AWS_Bucket_Name, Key }) {
        const result = new client_s3_1.DeleteObjectCommand({
            Bucket,
            Key
        });
        return await this.client.send(result);
    }
}
exports.default = new s3Service;
