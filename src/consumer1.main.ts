import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport } from "@nestjs/microservices";

// main-consumer-1.ts
async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        exchange: 'logs_exchange',
        exchangeType: 'fanout',
        queue: '', // auto-generated queue name
        queueOptions: { durable: true },
      },
    });
    await app.listen();
}
bootstrap();