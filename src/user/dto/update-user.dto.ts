import { IsEmpty, IsEnum, IsOptional, IsString, IsNumber, Max, Min } from "class-validator";
import { Role, DegreeType } from "../schemas/user.schema";

// Dynamic last year
const lastYear = new Date().getFullYear() - 1;

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    readonly firstName: string;

    @IsOptional()
    @IsString()
    readonly lastName: string;

    @IsOptional()
    @IsString()
    readonly pronoun: string;
    
    @IsOptional()
    @IsEmpty({message: 'Cannot update email here'})
    readonly email: string;

    @IsOptional()
    @IsEmpty({message: 'Cannot update password here'})
    readonly password: string;

    @IsOptional()
    @IsEnum(Role)
    readonly role: Role;

    @IsOptional()
    @IsEnum(DegreeType)
    readonly degreeType: DegreeType;

    @IsOptional()
    @IsString()
    readonly major: string;

    @IsOptional()
    @IsString()
    readonly graduationMonth: string;

    @IsOptional()
    @IsNumber()
    @Min(lastYear)
    @Max(2100)
    readonly graduationYear: number;

}
