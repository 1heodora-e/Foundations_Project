import { IsUUID, IsEmail, IsString, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 'c6a69d4b-b7d7-4e88-8c8c-e21b7f1ab4e9',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Role of the user (e.g., ADMIN, USER)',
    example: 'USER',
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    description: 'Specialization of the user (optional)',
    example: 'Cardiology',
    required: false,
  })
  @IsString()
  @IsOptional()
  specialization?: string;

  @ApiProperty({
    description: 'License number of the user',
    example: '1234567890',
  })
  @IsString()
  licenseNumber: string;

  @ApiProperty({
    description: 'Phone number of the user (optional)',
    example: '+1234567890',
    required: false,
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Hospital affiliation of the user (optional)',
    example: 'City Hospital',
    required: false,
  })
  @IsString()
  @IsOptional()
  hospitalAffiliation?: string;

  @ApiProperty({
    description: 'Creation date of the user',
    example: '2024-01-01T00:00:00Z',
  })
  @IsString()
  createdAt: Date;

  @ApiProperty({
    description: 'Last updated date of the user',
    example: '2024-01-01T00:00:00Z',
  })
  @IsString()
  updatedAt: Date;
}
