import {
  IsString,
  IsStrongPassword,
  IsOptional,
  IsEnum,
  IsEmail,
} from 'class-validator';
import { UserRole } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
    required: false,
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    description: 'Role of the user (e.g., ADMIN, USER)',
    example: 'USER',
    required: false,
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty({
    description: 'Specialization of the user',
    example: 'Cardiology',
    required: false,
  })
  @IsString()
  @IsOptional()
  specialization?: string;

  @ApiProperty({
    description: 'License number of the user',
    example: '1234567890',
    required: false,
  })
  @IsString()
  @IsOptional()
  licenseNumber?: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+1234567890',
    required: false,
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Hospital affiliation of the user',
    example: 'City Hospital',
    required: false,
  })
  @IsString()
  @IsOptional()
  hospitalAffiliation?: string;

  @ApiProperty({
    description: 'Password for the user (strong password required)',
    example: 'StrongPassword123!',
    required: false,
  })
  @IsStrongPassword()
  @IsOptional()
  password?: string;
}
