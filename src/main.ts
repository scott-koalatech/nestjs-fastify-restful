import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // cors setting
  app.enableCors({
    credentials: true,
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Open API')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, '0.0.0.0', (err: Error, appUri: string) => {
    if (err) {
      console.log(err);
      return;
    }
    const logger = new Logger();
    logger.log(`Server started at ${appUri}`);
    logger.log(`Swagger URL ${appUri + '/api'}`);
  });
}
bootstrap();
