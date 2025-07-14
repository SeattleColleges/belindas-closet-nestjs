import { Body, Controller, Delete, Get, Inject, Logger, Param, Patch, UseGuards, HttpCode, Query } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../../../auth/role.guard';
import { Roles } from '../../../auth/roles.decorator';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { UserSearchFilters } from '../../dto/user-search-filters.dto';
import { Role as UserRole } from '../../schemas/user.schema';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {

  private readonly logger = new Logger;
  CONTROLLER: string = UserController.name;

  constructor(@Inject('USER_SERVICE') private readonly userService: UserService) { }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get('')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Roles('admin')
  @UseGuards(RoleGuard)
  @Delete('delete/:id')
  @HttpCode(204) // Ensures no response in body
  async deleteUser(@Param('id') id: string) {
    this.logger.log('', this.CONTROLLER);
    return await this.userService.deleteUser(id);
  }

  /* --- search users (admin only) --- */
  @Roles('admin')
  @UseGuards(RoleGuard)
  @Get('search')
  async searchUsers(@Query() query: UserSearchFilters) {
    /* hard-fail if role query param isn’t a real enum */
    if (query.role && !Object.values(UserRole).includes(query.role as UserRole))
      query.role = '' as any;
    return this.userService.searchUsers(query);
  }

  @Get('find/:id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Patch('update/:id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto as any);
  }

  @Delete('remove/:id')
  async removeUser(@Param('id') id: string) {
    await this.userService.deleteUser(id);
  }
}

