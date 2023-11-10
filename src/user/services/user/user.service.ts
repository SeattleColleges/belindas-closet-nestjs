import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { Role } from '../../schemas/user.schema';

@Injectable()
export class UserService {

  private readonly logger = new Logger;
  SERVICE: string = UserService.name;

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async addUser(name: string, email: string, role: string): Promise<string> {
    this.logger.log(`Adding user with name: ${name}, email: ${email}, and role: ${role}`, this.SERVICE);
    const newUser = new this.userModel({ name, email, role }); // doc will be expanded to name: name etc.
    const result = await newUser.save();
    // return mongodb generated id note the underscore.
    this.logger.log(`User added with generated id: ${result._id}`, this.SERVICE);
    return result._id;
  }
    
  async getAllUsers(): Promise<any> {
    this.logger.log('Getting all Users', this.SERVICE);
    //fix: Use serialization to mask password, so we don't have to transform the data
    const users: User[] = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
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
      name: user.name,
      email: user.email,
      role: user.role,
    } as User;
  }
    
  async getUserByEmail(email: string): Promise<User> {
    this.logger.log(`Getting User with email: ${email}`, this.SERVICE);
    let user: User;
    try {
      user = await this.userModel.findOne({ email: email });
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

  async updateUser(id: string, name: string, email: string, role: Role) {
    this.logger.log(`Updating User with id: ${id}`, this.SERVICE);
    const updatedUser = await this.userModel.findById(id).exec();
    if (name) {
      this.logger.log(`Updating User name to: ${name}`, this.SERVICE);
      updatedUser.name = name;
    }
    if (email) {
      this.logger.log(`Updating User email to ${email}`, this.SERVICE);
      updatedUser.email = email;
    }
    if (role) {
      this.logger.log(`Updating User role to ${role}`, this.SERVICE);
      updatedUser.role = role;
    }
    const updated = await updatedUser.save();
    this.logger.log(`Updated User: ${updated}`, this.SERVICE);
    return updated;
  }
}
