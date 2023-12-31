import { Body, Controller, Get, Inject, Logger, Param, Patch } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../schemas/user.schema';

@Controller('user')
export class UserController {
  
  private readonly logger = new Logger;
  CONTROLLER: string = UserController.name;

  constructor(@Inject('USER_SERVICE') private readonly userService: UserService) {}
  
  @Get('')
  async getAllUsers() {
    this.logger.log('Getting all Users', this.CONTROLLER);
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    this.logger.log(`Getting User with id: ${id}`, this.CONTROLLER);
    return this.userService.getUserById(id);
  }
  
  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    this.logger.log(`Getting User with email: ${email}`, this.CONTROLLER);
    return await this.userService.getUserByEmail(email);
  }
    
  @Patch('update/:id')
  async updateUser(@Param('id') id: string, @Body() userDto: UpdateUserDto) {
    this.logger.log(
      `Updating User with id: ${id} with user: ${JSON.stringify(userDto, null, '\t')}`,
      this.CONTROLLER
    );
    return await this.userService.updateUser(id, userDto as User);
  }
}
