import { BadRequestException, HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schemas/user.schema';

@Injectable()
export class UserService {

  private readonly logger = new Logger;
  SERVICE: string = UserService.name;

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    
  async getAllUsers(): Promise<any> {
    this.logger.log('Getting all Users', this.SERVICE);
    //fix: Use serialization to mask password, so we don't have to transform the data
    const users: User[] = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    }));
  }

  async getUserById(id: string): Promise<User> {
    this.logger.log(`Getting User with id: ${id}`, this.SERVICE);
    let user: User;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      this.logger.error(`User not found, error message: ${error.message}`, this.SERVICE);
      throw new HttpException('User not found!', 404);
    }
    if (!user) {
      this.logger.warn('User not found', this.SERVICE);
      throw new HttpException('User not found!', 404);
    }
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    } as User;
  }
    
  async getUserByEmail(email: string): Promise<User> {
    this.logger.log(`Getting User with email: ${email}`, this.SERVICE);
    let user: User;
    try {
      user = await this.userModel.findOne({ email: email }).exec();
      this.logger.log(`Found user: ${user}`, this.SERVICE);
    } catch (error) {
      this.logger.error(`User not found, error message: ${error.message}`, this.SERVICE);
      throw new HttpException('User not found!', 404);
    }
    if (!user) {
      this.logger.warn('User not found', this.SERVICE);
      throw new HttpException('User not found!', 404);
    }
    return user;
  }

  async updateUser(id: string, user: User): Promise<User> {
    this.logger.log(
      `Updating User with id: ${id} with: ${JSON.stringify(user, null, '\t')}`,
      this.SERVICE
    );
    if (user === null) {
      this.logger.warn('Requires a User with updated properties')
      throw new BadRequestException(`Updated User not supplied`);
    }
    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true
    }).exec();
  }
}
