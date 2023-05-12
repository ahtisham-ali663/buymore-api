import { AuthSignUpDto, AuthSignInDto } from './dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signin')
  signIn(@Body() signInDto: AuthSignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('signup')
  signUp(@Body() signUpDto: AuthSignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
