import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user/user.repository';
import { User } from '../user/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { email, username, password, phone } = registerDto;

    // 检查邮箱是否已注册
    const existingEmail = await this.userRepository.findByEmail(email);
    if (existingEmail) {
      throw new BadRequestException('Email already exists');
    }

    // 检查用户名是否已注册
    const existingUsername = await this.userRepository.findByUsername(username);
    if (existingUsername) {
      throw new BadRequestException('Username already exists');
    }

    // 检查电话号码是否已注册
    const existingPhone = await this.userRepository.findByPhone(phone);
    if (existingPhone) {
      throw new BadRequestException('Phone already exists');
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建新用户
    const user = await this.userRepository.createUser({
      email,
      username,
      password: hashedPassword,
      phone,
      isActive: true,
    });

    return this.toAuthResponse(user);
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { username, password } = loginDto;

    // 查找用户
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // 检查账户是否激活
    if (!user.isActive) {
      throw new UnauthorizedException('User account is inactive');
    }

    if (password !== user.password) {
      throw new UnauthorizedException('Invalid username or password');
    }
    // 更新最后登录时间
    user.lastLoginAt = new Date();
    await this.userRepository.save(user);

    return this.toAuthResponse(user);
  }

  private toAuthResponse(user: User): AuthResponseDto {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      phone: user.phone,
      isActive: user.isActive,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
    };
  }
}
