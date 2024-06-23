import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { S3Service } from './s3.service';
import { CreateS3FileDTO } from './dto/create-s3-file.dto';
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from 'express';


@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Body() createS3FileDTO: CreateS3FileDTO,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.s3Service.uploadFile(createS3FileDTO, file.buffer);
  }
}
