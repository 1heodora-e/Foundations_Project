import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Roles } from '../auth/role-decorator';
import { RolesGuard } from '../auth/role.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Roles('GP')
  @ApiOperation({ summary: 'Create a new appointment' })
  @ApiResponse({ status: 201, description: 'Appointment created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden: Only GPs can create appointments',
  })
  create(
    @Req() req: any,
    @Body(ValidationPipe) createAppointmentDto: CreateAppointmentDto,
  ) {
    const userId = req.user.id;
    return this.appointmentsService.create(createAppointmentDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all appointments' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all appointments',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(@Req() req: any) {
    const userId = req.user.id;
    const userRole = req.user.role;
    return this.appointmentsService.findAll(userId, userRole);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get appointment by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved appointment',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Appointment not found' })
  findOne(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    const userRole = req.user.role;
    return this.appointmentsService.findOne(id, userId, userRole);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update appointment' })
  @ApiResponse({ status: 200, description: 'Successfully updated appointment' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Appointment not found' })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateAppointmentDto: UpdateAppointmentDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    const userRole = req.user.role;
    return this.appointmentsService.update(
      id,
      updateAppointmentDto,
      userId,
      userRole,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'GP')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete appointment (Admin or GP only)' })
  @ApiResponse({ status: 200, description: 'Successfully deleted appointment' })
  @ApiResponse({ status: 403, description: 'Forbidden: Insufficient role' })
  remove(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    const userRole = req.user.role;
    return this.appointmentsService.remove(id, userId, userRole);
  }
}
