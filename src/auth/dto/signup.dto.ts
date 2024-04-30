import { Role } from '../../user/schemas/user.schema';
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    readonly lastName: string;

    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter a valid email' })
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    readonly password: string;

    @IsNotEmpty()
    @IsString()
    readonly role: Role;
}