import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);
  private readonly pindoToken: string;
  private readonly pindoUrl: string;
  private readonly sender: string;

  constructor(private configService: ConfigService) {
    this.pindoToken = this.configService.get<string>('PINDO_TOKEN');
    this.pindoUrl = 'https://api.pindo.io/v1/sms/';
    this.sender = this.configService.get<string>('PINDO_SENDER') || 'PindoTest';
  }

  async sendSMS(to: string, message: string) {
    try {
      const response = await axios.post(
        this.pindoUrl,
        {
          to,
          text: message,
          sender: this.sender,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.pindoToken}`,
          },
        },
      );

      this.logger.log(`SMS sent successfully to ${to}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to send SMS to ${to}: ${error.message}`);
      // Don't throw error to prevent appointment creation failure
      // Just log it and continue
      return null;
    }
  }

  async sendNewAppointmentNotification(
    phoneNumber: string,
    recipientName: string,
    patientName: string,
    doctorName: string,
    appointmentDate: Date,
    recipientRole: 'patient' | 'specialist' | 'gp',
  ) {
    const formattedDate = new Date(appointmentDate).toLocaleDateString(
      'en-GB',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      },
    );

    let message: string;
    switch (recipientRole) {
      case 'patient':
        message = `Hello ${recipientName}, your appointment with Dr. ${doctorName} has been scheduled for ${formattedDate}. Please arrive 15 minutes early.`;
        break;
      case 'specialist':
        message = `Hello Dr. ${recipientName}, you have a new appointment with patient ${patientName} scheduled for ${formattedDate}.`;
        break;
      case 'gp':
        message = `Hello Dr. ${recipientName}, an appointment has been created under your supervision for patient ${patientName} scheduled for ${formattedDate}.`;
        break;
    }

    return this.sendSMS(phoneNumber, message);
  }

  async sendAppointmentUpdateNotification(
    phoneNumber: string,
    recipientName: string,
    patientName: string,
    doctorName: string,
    newDate: Date,
    recipientRole: 'patient' | 'specialist' | 'gp',
  ) {
    const formattedDate = new Date(newDate).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    let message: string;
    switch (recipientRole) {
      case 'patient':
        message = `Hello ${recipientName}, your appointment with Dr. ${doctorName} has been rescheduled to ${formattedDate}.`;
        break;
      case 'specialist':
        message = `Hello Dr. ${recipientName}, your appointment with patient ${patientName} has been rescheduled to ${formattedDate}.`;
        break;
      case 'gp':
        message = `Hello Dr. ${recipientName}, the appointment for patient ${patientName} has been rescheduled to ${formattedDate}.`;
        break;
    }

    return this.sendSMS(phoneNumber, message);
  }
}