import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailLogs, EmailLogsSchema } from './schema/email-logs.schema';

@Module({
  imports: [ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([
      {
        name: EmailLogs.name,
        schema: EmailLogsSchema,
      }
    ])],
  controllers: [AppController],
  providers: [AppService,
  ],
})
export class AppModule {}
