import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class AuthenService {
    constructor(private userService : UserService) {}


    async signUp(email: string , password: string) {
        // todo find email in database

        // review this is test git system 
        // todo if there is already email throw some errror

        // todo if there is not next process

        // todo hash password with salt by passwordsalt.salt

        // todo call command create from userService and post it into database
    }
}
