import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createuser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/signup')
  signup(@Body() body: CreateUserDto) {
    return this.userService.create(body.email, body.password);
  }

  @Post('findemail')
  findByEmail(@Body() body : any) {
    return this.userService.findbyemail(body.email)
  }

  @Delete('/clear')
  clear() {
    return this.userService.deleteAllUsers()
  }
}
