import { IsString, IsNotEmpty } from 'class-validator';

export class CreateS3FileDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  file: Buffer;
}
