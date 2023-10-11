import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { SignUpDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { name, email, password, role } = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('Email already exists', 400);
    }
    const newUser = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = this.jwtService.sign({
      message: 'Sign up successfully',
      id: newUser._id,
      name: newUser.name,
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
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return { token };
  }
  // generate product key for user to access the product
  generateProductKey(email: string, role: string) {
    const key = `${email}-${role}-${process.env.PRODUCT_KEY}`;
    const hashedKey = bcrypt.hashSync(key, 10);
    return hashedKey;
  }
}