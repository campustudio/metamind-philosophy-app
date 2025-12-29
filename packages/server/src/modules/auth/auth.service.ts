import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async loginWithPhone(phone: string, code: string) {
    // TODO: 实际项目中需要验证短信验证码
    // 这里简化处理，仅做演示
    let user = await this.userService.findByPhone(phone)

    if (!user) {
      user = await this.userService.create({
        phone,
        nickname: `用户${phone.slice(-4)}`,
      })
    }

    await this.userService.updateLastLogin(user._id.toString())

    const payload = { userId: user._id, phone: user.phone }
    const token = this.jwtService.sign(payload)

    return {
      token,
      user: {
        id: user._id,
        phone: user.phone,
        nickname: user.nickname,
        avatar: user.avatar,
      },
    }
  }

  async loginWithPassword(phone: string, password: string) {
    const user = await this.userService.findByPhone(phone)

    if (!user || !user.password) {
      throw new UnauthorizedException('手机号或密码错误')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('手机号或密码错误')
    }

    await this.userService.updateLastLogin(user._id.toString())

    const payload = { userId: user._id, phone: user.phone }
    const token = this.jwtService.sign(payload)

    return {
      token,
      user: {
        id: user._id,
        phone: user.phone,
        nickname: user.nickname,
        avatar: user.avatar,
      },
    }
  }

  async validateUser(userId: string) {
    return this.userService.findById(userId)
  }
}
