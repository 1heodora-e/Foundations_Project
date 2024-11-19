import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Ubuzima Connect API')
    .setDescription(
      `
        The official API documentation for Ubuzima Connect - A Healthcare Professional Collaboration Platform.
        For support, please contact our team at c.izabayo@alustudent.com
    `,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('http://localhost:3000', 'Local Development')
    .addServer('https://api.ubuzimaconnect.rw', 'Production') // Add your actual production URL
    .setContact(
      'Ubuzima Connect Team',
      'https://ubuzimaconnect.rw',
      'team@ubuzimaconnect.rw',
    )
    .setLicense('Private', 'https://ubuzimaconnect.rw/license')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Add Swagger UI customization options
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      defaultModelsExpandDepth: 0,
    },
    customSiteTitle: 'Ubuzima Connect API Docs',
  };

  SwaggerModule.setup('api-docs', app, document, customOptions);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
