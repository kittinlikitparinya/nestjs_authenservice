import { Body, Controller, Delete, Get, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createuser.dto';
import { AuthenService } from './authen.service';
import { SerializeInterceptor } from 'src/interceptors/serialize.intercepter';
import { UserDto } from './dto/user.dto';

@UseInterceptors(new SerializeInterceptor(UserDto))
@Controller('user')
export class UserController {
  constructor(private userService: UserService , private authenService : AuthenService) {}
  @Post('/signup')
  signup(@Body() body: CreateUserDto) {
    return this.authenService.signUp(body.email, body.password);
  }

  @Post('/signin')
  signin(@Body() body: CreateUserDto) {
    return this.authenService.signin(body.email,body.password)
  }


  @Get('/alluser')
  findall() {

    return this.userService.findAll()
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
