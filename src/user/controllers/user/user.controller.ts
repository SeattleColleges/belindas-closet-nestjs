import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from 'src/user/services/user/user.service';
import { Role } from 'src/user/types/user.model';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post('add')
    async addUser(
      @Body('name') name: string,
      @Body('email') email: string,
      @Body('role') role: string,
    ) {
      const generatedId = await this.userService.addUser(name, email, role);
      console.log(generatedId);
      return { id: generatedId };
    }
  
    @Get('')
    async getAllUsers() {
      return await this.userService.getAllUsers();
    }
  
    @Get(':id')
    async getUserById(@Param('id') id: string) {
      console.log(id);
      return this.userService.getUserById(id);
    }
  
    @Get('email/:email')
    async getUserByEmail(@Param('email') email: string) {
      return await this.userService.getUserByEmail(email);
    }
    @Patch('update/:id')
    async updateUser(
      @Param('id') id: string,
      @Body('name') name: string,
      @Body('email') email: string,
      @Body('role') role: Role,
    ) {
      await this.userService.updateUser(id, name, email, role);
    }
}
