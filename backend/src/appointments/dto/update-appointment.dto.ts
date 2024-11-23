import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAppointmentDto } from './create-appointment.dto';
import { AppointmentStatus } from '@prisma/client';
import { IsOptional } from 'class-validator';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  @ApiProperty({
    description:
      'Status of the appointment (e.g., PENDING, CONFIRMED, CANCELLED, COMPLETED)',
    example: 'PENDING',
    required: false,
  })
  @IsOptional()
  status?: AppointmentStatus;
}
