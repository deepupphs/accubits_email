import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ENV_VARS } from './const';



async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);
  const configService = app.get(ConfigService);

  const user = configService.get(ENV_VARS.RMQ.USERNAME);
  const password = configService.get(ENV_VARS.RMQ.PASSWORD);
  const host = configService.get(ENV_VARS.RMQ.HOST);
  const queueName = configService.get(ENV_VARS.SVC_QUEUES.SVC_EMAIL);

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${password}@${host}`],
      queue: queueName,
      queueOptions: {
        durable: true,
      },
    },
  });

  app.startAllMicroservices();
}
bootstrap();

