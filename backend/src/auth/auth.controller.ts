import {
  Body,
  Controller,
  Post,
  Res,
  HttpCode,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'Email already in use' })
  async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
    const { user, accessToken } = await this.authService.register(registerDto);
    res.setHeader('Authorization', `Bearer ${accessToken}`);

    return res.json({ user });
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Log in an existing user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { user, accessToken } = await this.authService.login(loginDto);
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    return res.json({ user });
  }
}
