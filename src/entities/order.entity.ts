// import { CreateUserDto } from '../dto/create-user.dto'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types} from 'mongoose';
import { OrderStatus } from '../enums/order.enum'

export type OrderDocument = Order & Document;
@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class Order {
  @Prop({ required: true })
  user: String;

  //מטיפוס משתמש שאמור להגיע מצוות משתמשים...
  // @Prop({ required: true })
  // user: CreateUserDto;

  @Prop({ required: true })
  products: String[];


  //מטיפוס מוצר שאמור להגיע מצוות האדום...
  // @Prop({ required: true })
  // products: Product[];

  @Prop({
    required: true,
    type: {
      city: String,
      street: String,
      numBuild: Number,
    }
  })
  destinationAddress: { city: String; street: String; numBuild: Number };

  @Prop({ default: OrderStatus.ACCEPTED })
  status: OrderStatus;

  @Prop({ default: new Date() })
  date: Date;
  //קוד בית העסק אמור להישלף מפרטי המנהל
  @Prop({ required: true })
  businessCode: string;
  
  @Prop({ type: SchemaTypes.ObjectId, required: true, auto: true })
  id: Types.ObjectId;

  @Prop({ required: true })
  settingManeger:number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
