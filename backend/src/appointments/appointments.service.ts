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
import { SmsService } from '../common/services/sms.service';

@Injectable()
export class AppointmentsService {
  constructor(
    private prisma: PrismaService,
    private smsService: SmsService,
  ) {}

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

    // Validations...
    await this.validateDoctor(createAppointmentDto.gpId, UserRole.GP);
    if (createAppointmentDto.specialistId) {
      await this.validateDoctor(
        createAppointmentDto.specialistId,
        UserRole.SPECIALIST,
      );
    }
    await this.validatePatient(createAppointmentDto.patientId);

    const appointment = await this.prisma.appointment.create({
      data: {
        ...createAppointmentDto,
        status: AppointmentStatus.PENDING,
      },
      include: {
        patient: true,
        specialist: true,
        gp: true,
      },
    });

    // Send notifications
    if (appointment.patient?.phoneNumber) {
      await this.smsService.sendNewAppointmentNotification(
        appointment.patient.phoneNumber,
        `${appointment.patient.firstName} ${appointment.patient.lastName}`,
        `${appointment.patient.firstName} ${appointment.patient.lastName}`,
        appointment.specialist
          ? `${appointment.specialist.firstName} ${appointment.specialist.lastName}`
          : `${appointment.gp.firstName} ${appointment.gp.lastName}`,
        appointment.date,
        'patient',
      );
    }

    if (appointment.specialist?.phoneNumber) {
      await this.smsService.sendNewAppointmentNotification(
        appointment.specialist.phoneNumber,
        `${appointment.specialist.firstName} ${appointment.specialist.lastName}`,
        `${appointment.patient.firstName} ${appointment.patient.lastName}`,
        `${appointment.specialist.firstName} ${appointment.specialist.lastName}`,
        appointment.date,
        'specialist',
      );
    }

    // Send notification to GP if created by admin
    if (userId !== appointment.gpId && appointment.gp?.phoneNumber) {
      await this.smsService.sendNewAppointmentNotification(
        appointment.gp.phoneNumber,
        `${appointment.gp.firstName} ${appointment.gp.lastName}`,
        `${appointment.patient.firstName} ${appointment.patient.lastName}`,
        appointment.specialist
          ? `${appointment.specialist.firstName} ${appointment.specialist.lastName}`
          : `${appointment.gp.firstName} ${appointment.gp.lastName}`,
        appointment.date,
        'gp',
      );
    }

    return appointment;
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

    // Prevent non-admin users from changing GP
    if (updateAppointmentDto.gpId && userRole !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'Only administrators can change the GP assignment',
      );
    }

    // Validate updates...
    if (
      updateAppointmentDto.specialistId &&
      updateAppointmentDto.specialistId !== existingAppointment.specialistId
    ) {
      await this.validateDoctor(
        updateAppointmentDto.specialistId,
        UserRole.SPECIALIST,
      );
    }

    if (
      updateAppointmentDto.gpId &&
      updateAppointmentDto.gpId !== existingAppointment.gpId
    ) {
      await this.validateDoctor(updateAppointmentDto.gpId, UserRole.GP);
    }

    if (
      updateAppointmentDto.patientId &&
      updateAppointmentDto.patientId !== existingAppointment.patientId
    ) {
      await this.validatePatient(updateAppointmentDto.patientId);
    }

    const updatedAppointment = await this.prisma.appointment.update({
      where: { id },
      data: updateAppointmentDto,
      include: {
        patient: true,
        specialist: true,
        gp: true,
      },
    });

    // Send notifications if date was updated
    if (updateAppointmentDto.date) {
      // Notify patient
      if (updatedAppointment.patient?.phoneNumber) {
        await this.smsService.sendAppointmentUpdateNotification(
          updatedAppointment.patient.phoneNumber,
          `${updatedAppointment.patient.firstName} ${updatedAppointment.patient.lastName}`,
          `${updatedAppointment.patient.firstName} ${updatedAppointment.patient.lastName}`,
          updatedAppointment.specialist
            ? `${updatedAppointment.specialist.firstName} ${updatedAppointment.specialist.lastName}`
            : `${updatedAppointment.gp.firstName} ${updatedAppointment.gp.lastName}`,
          updatedAppointment.date,
          'patient',
        );
      }

      // Notify specialist
      if (updatedAppointment.specialist?.phoneNumber) {
        await this.smsService.sendAppointmentUpdateNotification(
          updatedAppointment.specialist.phoneNumber,
          `${updatedAppointment.specialist.firstName} ${updatedAppointment.specialist.lastName}`,
          `${updatedAppointment.patient.firstName} ${updatedAppointment.patient.lastName}`,
          `${updatedAppointment.specialist.firstName} ${updatedAppointment.specialist.lastName}`,
          updatedAppointment.date,
          'specialist',
        );
      }

      // Notify GP if updated by admin
      if (userRole === UserRole.ADMIN && updatedAppointment.gp?.phoneNumber) {
        await this.smsService.sendAppointmentUpdateNotification(
          updatedAppointment.gp.phoneNumber,
          `${updatedAppointment.gp.firstName} ${updatedAppointment.gp.lastName}`,
          `${updatedAppointment.patient.firstName} ${updatedAppointment.patient.lastName}`,
          updatedAppointment.specialist
            ? `${updatedAppointment.specialist.firstName} ${updatedAppointment.specialist.lastName}`
            : `${updatedAppointment.gp.firstName} ${updatedAppointment.gp.lastName}`,
          updatedAppointment.date,
          'gp',
        );
      }
    }

    return updatedAppointment;
  }

  async remove(id: string, userId: string, userRole: UserRole) {
    await this.findOne(id, userId, userRole);

    return this.prisma.appointment.delete({
      where: { id },
    });
  }
}
