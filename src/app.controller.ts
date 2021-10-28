import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'email-service' })
  async createUserProfile(@Payload() payload: any) {
      if (!payload) {
          return new RpcException('Invalid payload');
      }
      const user = await this.appService.create(
    payload
      );
      return user;
  }
}
