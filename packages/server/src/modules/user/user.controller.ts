import { Controller, Get, Body, Patch, UseGuards, Request } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    return this.userService.findById(req.user.userId)
  }

  @Patch('profile')
  async updateProfile(@Request() req, @Body() updateData: any) {
    return this.userService.update(req.user.userId, updateData)
  }
}
