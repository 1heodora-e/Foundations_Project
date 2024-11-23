import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';
import { IsPastDate } from '../../common/validators/date.validator';

export class CreatePatientDto {
  @ApiProperty({
    description: 'First name of the patient',
    example: 'John',
    required: true,
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Last name of the patient',
    example: 'Doe',
    required: true,
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Date of birth of the patient',
    example: '2000-01-01',
    required: true,
  })
  @IsDateString()
  @IsPastDate({ message: 'Date of birth must be in the past' })
  dateOfBirth: string;

  @ApiProperty({
    description: 'Gender of the patient',
    example: 'male',
    required: true,
  })
  @IsString()
  gender: string;

  @ApiProperty({
    description: 'Phone number of the patient',
    example: '+1234567890',
    required: false,
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Address of the patient',
    example: '123 Main St, City, State, Zip',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'Emergency contact of the patient',
    example: 'Jane Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  emergencyContact?: string;

  @ApiProperty({
    description: 'Emergency phone number of the patient',
    example: '+1234567890',
    required: false,
  })
  @IsOptional()
  @IsString()
  emergencyPhone?: string;
}
