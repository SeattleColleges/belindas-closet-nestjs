import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from 'src/user/services/user/user.service';
import { Role } from 'src/user/types/user.model';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}


    /* `addUser` method is a route handler for the POST request to the '/user/add' endpoint. 
    It takes in the user's name, email, and role from the request body. */
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
  
    /* `getAllUsers` method is a route handler for the GET request to the '/user' endpoint. 
    It will handle requests to the base '/user' URL. */
    @Get('')
    async getAllUsers() {
      return await this.userService.getAllUsers();
    }


    /* Reordering the route handlers so that specific routes come before dynamic routes: 
    @Get('password-reset-email-sent') and @Get('registration-successful') route handlers above the @Get(':id') route handler*/
    
    /* This method is a route handler for the GET request to the '/user/password-reset-email-sent' endpoint. 
    Currently returns a JSON object
    with a message indicating that the password-reset-email-sent route has not been implemented yet. */
    @Get('password-reset-email-sent')
    passwordResetEmailSent() {
      return { message: 'Password reset email sent route not implemented yet' };
    }

    /* This method is a route handler for the GET request to the '/user/registration-successful' endpoint.
    The method is currently returning a JSON object 
    with a message indicating that the registration-successful route has not been implemented yet. */
    @Get('registration-successful')
    registrationSuccessful() {
      return { message: 'Registation successful route not implemented yet' };
    }


  
    /* `getUserById` method is a route handler for the GET request to the '/user/:id' endpoint. 
    It takes in the user's ID as a parameter from the URL path (`@Param('id') id: string`). */
    @Get(':id')
    async getUserById(@Param('id') id: string) {
      console.log(id);
      return this.userService.getUserById(id);
    }
  
    /* `getUserByEmail` method is a route handler for the GET request to the '/user/email/:email' endpoint. 
    It takes in the email as a parameter from the URL path (`@Param('email') email: string`)
    and calls the `getUserByEmail` method from the `userService` to retrieve the user with the specified
    email. 
    The method then returns the retrieved user. */
    @Get('email/:email')
    async getUserByEmail(@Param('email') email: string) {
      return await this.userService.getUserByEmail(email);
    }

    /* `updateUser` method is a route handler for the PATCH request to the '/user/update/:id' endpoint.
    It takes in the user's ID as a parameter from the URL path (`@Param('id') id: string`) and the
    updated user information (name, email, role) from the request body 
    (`@Body('name') name: string`, `@Body('email') email: string`, `@Body('role') role: Role`). */
    @Patch('update/:id')
    async updateUser(
      @Param('id') id: string,
      @Body('name') name: string,
      @Body('email') email: string,
      @Body('role') role: Role,
    ) {
      await this.userService.updateUser(id, name, email, role);
    }


    /* Below methods are stubbed which will be implemented later to handle the logic for user login/registration functionality */


    /* This method is a route handler for the POST request to the '/user/login' endpoint.
    Currently, returns a JSON object 
    with a message indicating that the login route has not been implemented yet. */
    @Post('login')
    login() {
      return { message: 'Login route not implemented yet' };
    }

    /* This method is a route handler for the POST request to the '/user/retry-login' endpoint.
    Currently, returns a JSON object 
    with a message indicating that the retry-login route has not been implemented yet. */
    @Post('retry-login')
    retryLogin() {
      return { message: 'Retry login route not implemented yet' };
    }

    /* This method is a route handler for the POST request to the '/user/password-reset' endpoint.
    Currently, returns a JSON object 
    with a message indicating that the password-reset route has not been implemented yet. */
    @Post('password-reset')
    passwordReset() {
      return { message: 'Password reset route not implemented yet' };
    }

    /* This method is a route handler for the POST request to the '/user/re-enter-email' endpoint.
    Currently, returns a JSON object 
    with a message indicating that the re-enter-email route has not been implemented yet. */
    @Post('re-enter-email')
    reEnterEmail() {
      return { message: 'Re-enter email address route not implemented yet' };
    }

    /* This method is a route handler for the POST request to the '/user/register' endpoint.
    Currently, returns a JSON object 
    with a message indicating that the register route has not been implemented yet. */
    @Post('register')
    register() {
      return { message: 'Registration route not implemented yet' };
    }

}
