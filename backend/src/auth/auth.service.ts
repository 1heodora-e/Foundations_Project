import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    public readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, firstName, lastName, role, licenseNumber } =
      registerDto;

    // Check for missing fields
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !role ||
      !licenseNumber
    ) {
      throw new BadRequestException(
        'All fields (email, password, firstName, lastName, role, licenseNumber) are required.',
      );
    }

    try {
      // Check if user already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new ConflictException(
          'Email already in use. Please choose a different email address.',
        );
      }

      // Hash user password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          role,
          licenseNumber,
        } as Prisma.UserCreateInput,
      });

      const tokens = await this.generateTokens(user.id, user.role);

      return {
        message: 'Registration successful!',
        user,
        ...tokens,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException(`Validation error: ${error.message}`);
      } else {
        throw new BadRequestException(
          'An unexpected error occurred while registering the user.',
        );
      }
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user.id, user.role);
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, ...tokens };
  }

  private async generateTokens(userId: string, role: string) {
    const payload = { sub: userId, role };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    return { accessToken };
  }
}
