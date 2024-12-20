import {
  Body,
  Controller,
  Post,
  HttpCode,
  Param,
  Get,
  UseGuards,
  HttpStatus,
  Patch,
  Req,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './Dto/userLoginDto';
import { UpdateUserDto } from './Dto/userUpdateDto';
import { CreateUserDto } from './Dto/userRegisterDto';
import { JwtService } from '@nestjs/jwt';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from './role.guard';
import { Roles } from './role-decorator';
import { UUID } from 'crypto';
import { JwtAuthGuard } from './jwt.guard';

@ApiTags('users')
@Controller('users')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 409, description: 'Email already in use' })
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Log in an existing user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Generate a new access token using the refresh token',
  })
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refresh_token: {
          type: 'string',
          description: 'The refresh token for generating a new access token',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiYXVkIjoiYXVkaWVuY2UifQ.sometokenvalue',
        },
      },
      required: ['refresh_token'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'New tokens generated successfully',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          description: 'The newly generated access token',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiYXVkIjoiYXVkaWVuY2UifQ.newaccesstokenvalue',
        },
        refresh_token: {
          type: 'string',
          description: 'The refresh token to use for future access tokens',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiYXVkIjoiYXVkaWVuY2UifQ.newrefreshtokenvalue',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid or expired refresh token',
  })
  async refreshToken(@Body() refreshTokenDto: { refresh_token: string }) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Get('me')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get logged-in user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile fetched successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: any) {
    const userId = req.user.id;
    return await this.authService.getMe(userId);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Get('admin-data')
  @Roles('ADMIN') // Only accessible to users with the 'ADMIN' role
  @ApiOperation({ summary: 'Get admin data (Admin only)' })
  @ApiResponse({ status: 200, description: 'Successfully fetched admin data' })
  @ApiResponse({ status: 403, description: 'Forbidden: Insufficient role' })
  getAdminData() {
    return { data: 'This is admin-only data' };
  }

  @UseGuards(RolesGuard)
  @Get('users')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Successfully fetched all users' })
  getAllUsers() {
    return this.authService.findAllUsers();
  }

  @UseGuards(RolesGuard)
  @Patch('users/:id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update user details (Admin only)' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the user to retrieve',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'User details updated successfully',
  })
  @ApiBody({ type: UpdateUserDto })
  async updateUser(
    @Param('id') id: UUID,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUser(id, updateUserDto);
  }

  @UseGuards(RolesGuard)
  @Delete('users/:id')
  @Roles('ADMIN')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user details (Admin only)' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'User deleted',
  })
  async deleteUser(@Param('id') id: UUID) {
    return this.authService.deleteUser(id);
  }
}
