import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'The id of the patient',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  patientId: string;

  @ApiProperty({
    description: 'The id of the general practitioner',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  gpId: string;

  @ApiProperty({
    description: 'The id of the specialist',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  specialistId?: string;

  @ApiProperty({
    description: 'The date of the appointment',
    example: '2021-01-01T00:00:00.000Z',
  })
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'The reason for the appointment',
    example: 'Annual checkup',
  })
  @IsString()
  reason: string;

  @ApiProperty({
    description: 'Any additional notes for the appointment',
    example: 'Patient has a history of heart disease',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
