import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: { phone: string; code: string }) {
    return this.authService.loginWithPhone(loginDto.phone, loginDto.code)
  }

  @Post('login/password')
  @HttpCode(HttpStatus.OK)
  async loginWithPassword(@Body() loginDto: { phone: string; password: string }) {
    return this.authService.loginWithPassword(loginDto.phone, loginDto.password)
  }
}
