import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('hello')
  handleMessage(@Payload() data) {
    console.log('Received Message', data);
  }

  //work queue
  @EventPattern('process_task')
  handleTask(@Payload() data: any) {
    console.log('Processing task:', data);
  }
  // RPC (Request-Reply) – Command-Driven
  @MessagePattern('get_user_details')
  getUser(@Payload() userId: number) {
    return { userId, name: 'Suresh' };
  }

  // fanout
  @EventPattern('logs_exchange')
  handleLogs(@Payload() data: any) {
    console.log('Received log:', data.message);
  }

  @EventPattern('logs_exchange')
  handleMessageQueue(@Payload() data: any) {
    console.log('Consumer 1 received:', data);
  }

  @EventPattern('logs_exchange')
  handleMessageQueue2(@Payload() data: any) {
    console.log('Consumer 2 received:', data);
  }
}
