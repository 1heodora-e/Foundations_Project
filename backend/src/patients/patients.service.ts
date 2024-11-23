import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}
  create(createPatientDto: CreatePatientDto, userId: string) {
    return this.prisma.patient.create({
      data: {
        ...createPatientDto,
        dateOfBirth: new Date(`${createPatientDto.dateOfBirth}T00:00:00.000Z`),
        createdBy: userId,
      },
    });
  }

  findAll() {
    return this.prisma.patient.findMany({
      // where: {
      //   createdBy: userId,
      // },
      include: {
        appointments: true,
      },
    });
  }

  findOne(id: string) {
    const patient = this.prisma.patient.findUnique({
      where: {
        id,
      },
      include: {
        appointments: true,
      },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return patient;
  }

  update(id: string, updatePatientDto: UpdatePatientDto) {
    const existingPatient = this.findOne(id);

    if (updatePatientDto.dateOfBirth) {
      updatePatientDto.dateOfBirth = new Date(
        `${updatePatientDto.dateOfBirth}T00:00:00.000Z`,
      ).toISOString();
    }

    return this.prisma.patient.update({
      where: {
        id,
      },
      data: updatePatientDto,
    });
  }

  remove(id: string) {
    const existingPatient = this.findOne(id);

    return this.prisma.patient.delete({
      where: {
        id,
      },
    });
  }
}
