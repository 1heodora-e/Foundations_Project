import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { UserRole } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user, must be at least 8 characters long',
    example: 'password123',
  })
  @IsString()
  @Length(8, 50)
  password: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @IsString()
  @Length(1, 50)
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  @IsString()
  @Length(1, 50)
  lastName: string;

  @ApiProperty({
    description: 'The role of the user (e.g., ADMIN, USER)',
    example: 'USER',
  })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({
    description: 'The specialization of the user (optional)',
    example: 'Cardiology',
    required: false,
  })
  @IsString()
  @IsOptional()
  specialization?: string;

  @ApiProperty({
    description: 'The license number of the user',
    example: '1234567890',
  })
  @IsString()
  @Length(1, 20)
  licenseNumber: string;

  @ApiProperty({
    description: 'The phone number of the user (optional)',
    example: '+1234567890',
    required: false,
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    description: 'The hospital affiliation of the user (optional)',
    example: 'City Hospital',
    required: false,
  })
  @IsString()
  @IsOptional()
  hospitalAffiliation?: string;
}
