import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { promisify } from 'util';
import { scrypt as _scrypt, randomBytes } from 'crypto';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthenService {
  constructor(private userService: UserService) {}

  async signUp(email: string, password: string) {
    // todo find email in database

    const user = await this.userService.findbyemail(email);

    // done if there is already email throw some errror

    if (user.length) {
      throw new BadRequestException('This email already store in our database');
    }

    // done if there is not next process

    const salt = randomBytes(8).toString('hex');

    // done hash password with salt by passwordsalt.salt
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const saltAndHash = `${salt}.${hash.toString('hex')}`;

    // done call command create from userService and post it into database

    return this.userService.create(email, saltAndHash);
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.findbyemail(email);

    if (!user) {
      throw new BadRequestException('not found user');
    }

    const [salt, storehash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (hash.toString('hex') !== storehash) {
      throw new BadRequestException('password is wrong');
    }

    return user;
  }
}
