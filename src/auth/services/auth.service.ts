import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../user/schemas/user.schema';
import { SignUpDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { GetUser } from '../decorator/user.decorator';
import { randomBytes } from 'crypto';
import * as AWS from 'aws-sdk';
import getResetPasswordEmailTemplate from '../email-templates/reset-password';

@Injectable()
export class AuthService {
  private ses: AWS.SES;

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {
    // Configure AWS SES
    this.ses = new AWS.SES({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async signUp(signUpDto: SignUpDto) {
    const { firstName, lastName, email, pronoun, password, role } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('Email already exists', 400);
    }
    const newUser = await this.userModel.create({
      firstName,
      lastName,
      email,
      pronoun,
      password: hashedPassword,
      role,
    });

    const token = this.jwtService.sign({
      message: 'Sign up successfully',
      id: newUser._id,
      firstName: newUser.firstName,
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

    const token = this.jwtService.sign(
      {
        message: 'Login successful',
        id: user._id,
        firstName: user.firstName,
        role: user.role,
      },
      { expiresIn: process.env.JWT_EXPIRES_IN || '120m' },
    );

    return { token };
  }
  // change password function
  async changePassword(
    changePasswordDto: ChangePasswordDto,
    @GetUser() user: User,
  ) {
    const { currentPassword, newPassword, confirmPassword } = changePasswordDto;

    // get user email and password
    const userEmail = user.email;
    const userPassword = user.password;

    // compare current password with user password
    const isValidPassword = await bcrypt.compare(currentPassword, userPassword);
    if (!isValidPassword) {
      throw new HttpException('Invalid credentials', 400);
    }

    // check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      throw new HttpException('Passwords do not match', 400);
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // compare new password with previous password
    const isSamePassword = await bcrypt.compare(newPassword, userPassword);
    if (isSamePassword) {
      throw new HttpException(
        'New password cannot be the same as previous password',
        400,
      );
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

    // Generate a random reset token
    const resetToken = randomBytes(32).toString('hex');

    // Set token expiration (1 hour from now)
    const resetTokenExpires = new Date();
    resetTokenExpires.setHours(resetTokenExpires.getHours() + 1);

    // Save the reset token and expiration to the user document
    await this.userModel.updateOne(
      { email },
      {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetTokenExpires,
      },
    );

    // Create reset password URL
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8082';
    const resetUrl = `${frontendUrl}/auth/reset-password?token=${resetToken}`;

    try {
      // Generate email HTML content using the template
      const emailHtml = getResetPasswordEmailTemplate(
        user.firstName || '',
        resetUrl,
      );

      // Send email with AWS SES
      const params = {
        Source: process.env.SENDER_EMAIL,
        Destination: {
          ToAddresses: [email],
        },
        Message: {
          Subject: {
            Data: 'Password Reset Request',
          },
          Body: {
            Html: {
              Data: emailHtml,
            },
          },
        },
      };

      await this.ses.sendEmail(params).promise();
      return { message: 'Password reset email sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new HttpException('Failed to send password reset email', 500);
    }
  }

  // verify reset token and reset password
  async resetPassword(token: string, resetPasswordDto: ResetPasswordDto) {
    const { newPassword, confirmPassword } = resetPasswordDto;

    // check if passwords match
    if (newPassword !== confirmPassword) {
      throw new HttpException('Passwords do not match', 400);
    }

    // find user with the token and check if token is still valid
    const user = await this.userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new HttpException('Invalid or expired password reset token', 400);
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update user password and clear reset token fields
    await this.userModel.updateOne(
      { _id: user._id },
      {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    );

    return { message: 'Password has been reset successfully' };
  }
}
