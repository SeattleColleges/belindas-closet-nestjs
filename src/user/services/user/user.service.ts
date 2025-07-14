import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { UserSearchData, UserSearchFilters } from '../../dto/user-search-filters.dto';

@Injectable()
export class UserService {

  private readonly logger = new Logger;
  SERVICE: string = UserService.name;

  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async getAllUsers(): Promise<any[]> {
    const users: User[] = await this.userModel.find().exec();
    return users.map((u) => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      pronoun: u.pronoun,
      email: u.email,
      role: u.role,
    }));
  }

  /* ───────────── SEARCH with filters ───────────── */
  async searchUsers(filters: UserSearchFilters): Promise<UserSearchData> {
    const { firstName, lastName, email, role, page } = filters;
    const currentPage = Number(page) || 1;
    const limit = 9;
    const skip = (currentPage - 1) * limit;

    /* Build Mongo query */
    const queryConditions: any[] = [];
    if (firstName)
      queryConditions.push({
        firstName: { $regex: firstName.toString(), $options: 'i' },
      });
    if (lastName)
      queryConditions.push({
        lastName: { $regex: lastName.toString(), $options: 'i' },
      });
    if (email)
      queryConditions.push({
        email: { $regex: email.toString(), $options: 'i' },
      });
    if (role) queryConditions.push({ role });

    const options = queryConditions.length ? { $and: queryConditions } : {};

    try {
      const usersQuery = this.userModel.find(options).sort({ lastName: 'asc' });
      const [data, total] = await Promise.all([
        usersQuery.skip(skip).limit(limit).exec(),
        this.userModel.countDocuments(options),
      ]);

      const serialized = data.map((u) => ({
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        pronoun: u.pronoun,
        email: u.email,
        role: u.role,
      }));

      return {
        data: serialized,
        page: currentPage,
        total,
        pages: Math.ceil(total / limit),
      };
    } catch (err) {
      this.logger.error('Error searching users', err);
      throw new HttpException(
        'Error retrieving users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
      pronoun: user.pronoun,
      role: user.role,
    } as User;
  }

  async deleteUser(id: string): Promise<void> { // No return value needed
    try {
      const deleteUser = await this.userModel.findByIdAndDelete(id).exec();
      if (!deleteUser) {
        throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      this.logger.error(`User not found, error message: ${error.message}`, this.SERVICE);
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
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
