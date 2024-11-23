import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { SmsService } from '../common/services/sms.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, SmsService],
})
export class AppointmentsModule {}
