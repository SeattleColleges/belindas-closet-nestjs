import { IsEmpty, IsEnum, IsOptional, IsString, IsArray, IsNumber, Min, Max, Matches } from 'class-validator';
import { Role, DegreeType, LookingForItem, Months } from '../schemas/user.schema';
import { Transform } from 'class-transformer';

// Dynamic last year
const lastYear = new Date().getFullYear() - 1;

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    @Matches(/^[a-zA-Z\s\-]*$/, {
        message: 'Name can only contain letters, spaces, hyphens (-)',
    })
    readonly firstName: string;

    @IsOptional()
    @IsString()
    @Matches(/^[a-zA-Z\s\-]*$/, {
        message: 'Name can only contain letters, spaces, hyphens (-)',
    })
    readonly lastName: string;

    @IsOptional()
    @IsString()
    @Matches(/^[a-zA-Z\s\/]*$/, {
        message: 'Name can only contain letters, spaces, front dash (/)',
    })
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
    @Matches(/^[a-zA-Z0-9\s\-']*$/, {
        message: 'Major can only contain letters, spaces, numbers, hyphens (-), and apostrophes (\')',
    })
    readonly major: string;

    @IsOptional()
    @IsString()
    @IsEnum(Months)
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
