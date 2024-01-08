import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequest, SignUpRequest } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async signUp(@Body() body: SignUpRequest) {
    return await this.authService.register(
      body.username,
      body.email,
      body.password,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() body: SignInRequest): Promise<{ token: string }> {
    return await this.authService.signIn(body.username, body.password);
  }
}
