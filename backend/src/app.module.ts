import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [AuthModule, AppointmentsModule, PatientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
