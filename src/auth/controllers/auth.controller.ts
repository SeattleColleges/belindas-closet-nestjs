import { GenerateProductKeyDto } from './../dto/product-key.dto';
import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/signup.dto';
import { AuthService } from '../services/auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string}> {
        return this.authService.signUp(signUpDto);
    }

    @Post ('/login')
    login(@Body() loginDto: LoginDto): Promise<{ token: string}> {
        return this.authService.login(loginDto);
    }
    
    // this is the route for generating a product key for a user to use to register for admin access
    @Post('/key')
    createKey(@Body() productKeyDto: GenerateProductKeyDto): Promise<{ key: string }> {
        const userEmail = productKeyDto.email;
        const userRole = productKeyDto.role;
        return this.authService.generateProductKey(userEmail, userRole);
    }

    // forgot password route
    @Post('/forgot-password')
    forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<void> {
        return this.authService.forgotPassword(forgotPasswordDto);
    }
}
