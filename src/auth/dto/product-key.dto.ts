import { IsString } from "class-validator";

export class GenerateProductKeyDto{
    @IsString()
    email: string;

    @IsString()
    role: string;
}