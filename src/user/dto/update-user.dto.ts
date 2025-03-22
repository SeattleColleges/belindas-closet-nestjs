import { IsEmpty, IsEnum, IsOptional, IsString, IsArray, IsNumber, Min, Max } from 'class-validator';
import { Role, DegreeType, LookingForItem } from "../schemas/user.schema";
import { Transform } from 'class-transformer';

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
    @IsString()
    @IsEnum(DegreeType)
    readonly degreeType: string;

    @IsOptional()
    @IsString()
    readonly major: string;

    @IsOptional()
    @IsString()
    readonly graduationMonth: string;

    @IsOptional()
    @Transform(({ value }) => (value ? Number(value) : value))
    @IsNumber()
    @Min(lastYear)
    @Max(2100)
    readonly graduationYear: string;

    @IsOptional()
    @IsArray()
    readonly lookingFor: LookingForItem[];

}
