import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthenService } from './authen.service';
@Module({
  controllers: [UserController],
  providers: [UserService, AuthenService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
