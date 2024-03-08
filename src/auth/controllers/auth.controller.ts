import { ChangePasswordDto } from '../dto/change-password.dto';
import { LoginDto } from '../dto/login.dto';
import { SignUpDto } from '../dto/signup.dto';
import { AuthService } from '../services/auth.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { JwtAuthGuard } from '../jwt.guard';
import { GetUser } from '../decorator/user.decorator';
import { User } from 'src/user/schemas/user.schema';

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
    
    // change password route
    @Post('/change-password')
    @UseGuards(JwtAuthGuard)
    changePassword(@Body() changePasswordDto: ChangePasswordDto, @GetUser() user: User): Promise<{ message: string }> {
        return this.authService.changePassword(changePasswordDto, user);
    }

    // forgot password route
    @Post('/forgot-password')
    forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string }> {
        return this.authService.forgotPassword(forgotPasswordDto);
    }
}
