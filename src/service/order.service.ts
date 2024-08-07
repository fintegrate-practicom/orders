import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types, Model } from 'mongoose';
import { Order } from '../entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { RabbitPublisherService } from '../rabbit-publisher/rabbit-publisher.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    private readonly rabbitPublisherService: RabbitPublisherService,
  ) {}

  async create(
    createOrderDto: CreateOrderDto,
  ): Promise<{ order: Order; status: HttpStatus }> {
    try {
      const createdOrder = new this.orderModel(createOrderDto);
      var mailAdress: string;
      if(process.env.ENV=="DEVELOPMENT")
          mailAdress= process.env.SENDGRID_FROM_EMAIL;
      // else
      //   mailAdress=savedOrder.user.email
      
      const savedOrder = await createdOrder.save();
      const message = {
        pattern: 'message_queue',
        data: {
          to:mailAdress,         
          subject: 'message about a new order',
          html: '',
          type: 'email',
          kindSubject: 'orderMessage',
          numOrder: savedOrder.id,
          nameBussniesCode: savedOrder.businessCode,
          date: `${savedOrder.date.getUTCDate()}/${savedOrder.date.getUTCMonth()}/${savedOrder.date.getUTCFullYear()}`,
        },
      };
      console.log('mail data', message.data);

      this.rabbitPublisherService.publishMessageToCommunication(message);
      return { order: savedOrder, status: HttpStatus.CREATED };
    } catch (error) {
      throw new HttpException(
        'Failed to create order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    ObjectId: Types.ObjectId,
    createOrderDto: CreateOrderDto,
  ): Promise<{ order: Order; status: HttpStatus }> {
    try {
      const updatedOrder = await this.orderModel.findOneAndUpdate(
        { id: ObjectId },
        { $set: createOrderDto },
        { new: true },
      );
      if (!updatedOrder) {
        return { order: null, status: HttpStatus.INTERNAL_SERVER_ERROR };
      } else {
        return { order: updatedOrder, status: HttpStatus.CREATED };
      }
    } catch (err) {
      throw new HttpException(
        'Failed to service update order',
        HttpStatus.INTERNAL_SERVER_ERROR + err,
      );
    }
  }

  async remove(
    id: Types.ObjectId,
  ): Promise<{ order: Order; status: HttpStatus }> {
    try {
      const deletedOrder = await this.orderModel.findOneAndDelete({ id: id });
      if (!deletedOrder) {
        throw new HttpException(
          `Order with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return { order: deletedOrder, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        'Failed to delete order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllByBusinessCode(businessCode: string): Promise<Order[]> {
    try {
      return await this.orderModel.find({ businessCode }).exec();
    } catch (error) {
      throw new HttpException(
        'Failed to getAllByBusinessCode order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findAllByBusinessCodeAndCustomerId(
    user: string,
    businessCode: string,
  ): Promise<Order[]> {
    try {
      return this.orderModel.find({ user, businessCode }).exec();
    } catch (error) {
      throw new HttpException(
        'Failed to find orders by customer and busienss',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
