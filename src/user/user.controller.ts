import { UserService } from './user.service';
import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('get-product')
  getProductFromUser() {
    return this.userService.getProductFromUser();
    // console.log('getProductFromUser: ', this.userService.getProductFromUser());
  }
}
