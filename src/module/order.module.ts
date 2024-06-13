import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from '../service/order.service';
import { OrderController } from '../controller/order.controller';
import { Order, OrderSchema } from '../entities/order.entity'; 
import { GeneralService } from '../service/general.service'
// import {RabbitPublisherService} from '../rabbit-publisher/rabbit-publisher.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrderController],
  // providers: [OrderService,GeneralService,RabbitPublisherService],
    providers: [OrderService,GeneralService],

})
export class OrderModule {}
