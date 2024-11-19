import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './Dto/userRegisterDto';
import { LoginDto } from './Dto/userLoginDto';
import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    public readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: Prisma.UserCreateInput) {
    const { email, password, ...rest } = createUserDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException(
        'Email already in use. Please choose a different email address.',
      );
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...rest,
        email,
        password: hashedPassword,
      },
    });

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.role);

    // Return response excluding password
    const { password: _, ...userWithoutPassword } = user;
    return {
      message: 'Registration successful!',
      user: userWithoutPassword,
      ...tokens,
    };
  }

  async findAllUsers(): Promise<Partial<User>[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        specialization: true,
        licenseNumber: true,
        phoneNumber: true,
        hospitalAffiliation: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
  async updateUser(
    id: string,
    updateUserDto: Prisma.UserUpdateInput,
  ): Promise<Partial<User>> {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update the user
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        specialization: true,
        licenseNumber: true,
        phoneNumber: true,
        hospitalAffiliation: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.role);

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      ...tokens,
    };
  }
  async refreshToken(refreshToken: object) {
    const token = refreshToken['refresh_token'];
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.REFRESH_SECRET,
      });
      // Fetch the user from the database
      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate new tokens
      const tokens = await this.generateTokens(user.id, user.role);
      return tokens;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  // generate both refresh and access token
  async generateTokens(userId: string, role: string) {
    const accessToken = this.jwtService.sign(
      { id: userId, role },
      { secret: process.env.JWT_SECRET, expiresIn: '1h' },
    );

    const refreshToken = this.jwtService.sign(
      { id: userId },
      { secret: process.env.REFRESH_SECRET, expiresIn: '7d' },
    );

    return { accessToken, refreshToken };
  }

  // Delete User (Admin only)
  async deleteUser(userId: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({
      where: { id: userId },
    });

    return { message: `User with ID ${userId} has been deleted` };
  }

  // User Profile
  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phoneNumber: true,
        hospitalAffiliation: true,
        specialization: true,
        licenseNumber: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found'); // You can customize this error
    }

    return user;
  }
}
