import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRole, AppointmentStatus } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  // Modified validation method
  private async validateDoctor(userId: string, role: UserRole) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (user.role !== role) {
      throw new BadRequestException(
        `User ${userId} is not a ${role === UserRole.GP ? 'General Practitioner' : 'Specialist'}`,
      );
    }

    return true;
  }

  private async validatePatient(patientId: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${patientId} not found`);
    }

    return true;
  }

  async create(createAppointmentDto: CreateAppointmentDto, userId: string) {

    if (userId !== createAppointmentDto.gpId) {
      // check if user is an admin
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });

      if (user.role !== UserRole.ADMIN) {
        throw new ForbiddenException(
          'You do not have permission to create an appointment for another user',
        );
      }
    }

    // Validate GP (userId)
    await this.validateDoctor(createAppointmentDto.gpId, UserRole.GP);

    // Only validate specialist if provided
    if (createAppointmentDto.specialistId) {
      await this.validateDoctor(
        createAppointmentDto.specialistId,
        UserRole.SPECIALIST,
      );
    }

    // Validate patient
    await this.validatePatient(createAppointmentDto.patientId);

    return this.prisma.appointment.create({
      data: {
        ...createAppointmentDto,
        gpId: userId,
        status: AppointmentStatus.PENDING,
      },
      include: {
        patient: true,
        specialist: true,
        gp: true,
      },
    });
  }

  async findAll(userId: string, userRole: UserRole) {
    const where =
      userRole === UserRole.GP
        ? { gpId: userId }
        : userRole === UserRole.SPECIALIST
          ? { specialistId: userId }
          : {};

    return this.prisma.appointment.findMany({
      where,
      include: {
        patient: true,
        specialist: true,
        gp: true,
      },
    });
  }

  async findOne(id: string, userId: string, userRole: UserRole) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        patient: true,
        specialist: true,
        gp: true,
      },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    if (
      userRole !== UserRole.ADMIN &&
      appointment.gpId !== userId &&
      appointment.specialistId !== userId
    ) {
      throw new ForbiddenException(
        'You do not have access to this appointment',
      );
    }

    return appointment;
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
    userId: string,
    userRole: UserRole,
  ) {
    const existingAppointment = await this.findOne(id, userId, userRole);

    // Only validate specialist if it's being updated
    if (
      updateAppointmentDto.specialistId &&
      updateAppointmentDto.specialistId !== existingAppointment.specialistId
    ) {
      await this.validateDoctor(
        updateAppointmentDto.specialistId,
        UserRole.SPECIALIST,
      );
    }

    // Only validate GP if it's being updated
    if (
      updateAppointmentDto.gpId &&
      updateAppointmentDto.gpId !== existingAppointment.gpId
    ) {
      await this.validateDoctor(updateAppointmentDto.gpId, UserRole.GP);
    }

    // Only validate patient if it's being updated
    if (
      updateAppointmentDto.patientId &&
      updateAppointmentDto.patientId !== existingAppointment.patientId
    ) {
      await this.validatePatient(updateAppointmentDto.patientId);
    }

    return this.prisma.appointment.update({
      where: { id },
      data: updateAppointmentDto,
      include: {
        patient: true,
        specialist: true,
        gp: true,
      },
    });
  }

  async remove(id: string, userId: string, userRole: UserRole) {
    await this.findOne(id, userId, userRole);

    return this.prisma.appointment.delete({
      where: { id },
    });
  }
}
