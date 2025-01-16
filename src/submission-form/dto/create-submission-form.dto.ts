import { IsString, IsEmail } from 'class-validator';

export class CreateSubmissionFormDto {
  @IsString()
  name: string;

  @IsString()
  gender: string;

  @IsEmail()
  email: string;

  @IsString()
  size: string;
}
