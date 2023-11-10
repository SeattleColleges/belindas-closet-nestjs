import { Body, Controller, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { UserService } from 'src/user/services/user/user.service';
import { Role } from 'src/user/schemas/user.schema';

@Controller('user')
export class UserController {
  
  private readonly logger = new Logger;
  CONTROLLER: string = UserController.name;

  constructor(private readonly userService: UserService) {}

  @Post('add')
  async addUser(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('role') role: Role,
  ) {
    this.logger.log(`Adding User with first name: ${firstName}, last name ${lastName}, email: ${email}, and role: ${role}`, this.CONTROLLER);
    const generatedId = await this.userService.addUser(firstName, lastName, email, role);
    this.logger.log(`Generated id: ${generatedId}`, this.CONTROLLER);
    return { id: generatedId };
  }
  
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
  async updateUser(
    @Param('id') id: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('role') role: Role,
  ) {
    this.logger.log(
      `Updating User with id: ${id} with first name: ${firstName}, last name: ${lastName}  email: ${email}, and role: ${role}`,
      this.CONTROLLER
    );
    await this.userService.updateUser(id, firstName, lastName, email, role);
  }
}
