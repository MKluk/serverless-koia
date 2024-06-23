import { Injectable } from '@nestjs/common';
import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { CreateS3FileDTO } from "./dto/create-s3-file.dto";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;
  private readonly region = process.env.AWS_REGION;
  private readonly awsBucketUrl = process.env.S3_BUCKET_URL;

  constructor() {
    this.s3Client = new S3Client({ region: this.region });
  }

  async uploadFile(createS3FileDTO: CreateS3FileDTO, file: Buffer): Promise<string> {
    const key = `${uuidv4()}-${createS3FileDTO.name}`;
    const uploadFileCommand = new PutObjectCommand({
      Bucket: this.awsBucketUrl,
      Key: key,
      Body: file,
    });
    const getFileCommand = new GetObjectCommand({
      Bucket: this.awsBucketUrl,
      Key: key,
    });
    await this.s3Client.send(uploadFileCommand);
    return await getSignedUrl(this.s3Client, getFileCommand);
  }
}
