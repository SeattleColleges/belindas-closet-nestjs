import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { SignUpDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { MailService } from '@sendgrid/mail';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { GetUser } from '../decorator/user.decorator';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { firstName, lastName, email, password, role } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('Email already exists', 400);
    }
    const newUser = await this.userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    const token = this.jwtService.sign({
      message: 'Sign up successfully',
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role,
    });

    return { token };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('Invalid credentials', 400);
    }

    // compare password with hashed password
    const hashedPassword = user.password;
    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!isValidPassword) {
      throw new HttpException('Invalid credentials', 400);
    }

    const token = this.jwtService.sign({
      message: 'Login successful',
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });

    return { token };
  }
  // change password function
  async changePassword(
    changePasswordDto: ChangePasswordDto,
    @GetUser() user: User,
  ) {
    const { newPassword, confirmPassword } = changePasswordDto;

    // get user email and password
    const userEmail = user.email;
    const userPassword = user.password;

    // check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      throw new HttpException('Passwords do not match', 400);
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // compare new password with previous password
    const isValidPassword = await bcrypt.compare(newPassword, userPassword);
    if (isValidPassword) {
      throw new HttpException('New password cannot be the same as previous password', 400);
    }

    // update user password
    await this.userModel.updateOne(
      {
        email: userEmail,
      },
      {
        password: hashedPassword,
      },
    );

    return { message: 'Password changed successfully' };
  }

  // forgot password function
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;

    // check if user exists
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new HttpException('User does not exist', 404);
    }

    // generate new password
    const newPassword = Math.random().toString(36).slice(-8);

    // update user password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userModel.updateOne(
      {
        email,
      },
      {
        password: hashedPassword,
      },
    );
    // send new password to user
    const mailService = new MailService();
    mailService.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email, // For testing purposes, replace with your email to see the email
      from: process.env.SENDER_EMAIL,
      subject: 'Reset Password',
      html: `<p>Your new password is <strong>${newPassword}</strong>. <br> Please change your password after logging in</p>`,
    };

    mailService
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error);
      });

    return { message: 'Password reset successfully' };
  }
}
