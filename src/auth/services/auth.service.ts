import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import * as bcrypt from 'bcrypt';
import { SES } from 'aws-sdk';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  // ... other methods ...

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

    // send new password to user using SES
    const ses = new SES({ region: 'your-aws-region' }); // Replace 'your-aws-region' with your AWS region
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Text: {
            Data: `Your new password is ${newPassword}. Please change your password after logging in.`,
          },
        },
        Subject: { Data: 'Reset Password' },
      },
      Source: 'your-sender-email', // Replace with your sender email address
    };

    ses.sendEmail(params, function (err, data) {
      if (err) {
        console.error(err, err.stack);
        throw new HttpException('Failed to send email', 500);
      } else {
        console.log('Email sent', data);
      }
    });

    return { message: 'Password reset successfully' };
  }
}
