import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app: any = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: ['amqps://avtfpzkt:BNkdj24Bx32fg_XK4I2Rz1_ZaA8IYbjR@gull.rmq.cloudamqp.com/avtfpzkt'],
            queue: 'main_queue',
            queueOptions: {
                durable: false
            },
        },


    });


    app.listen(() => {
        console.log('Microservice is listening')
    });
}
bootstrap();
