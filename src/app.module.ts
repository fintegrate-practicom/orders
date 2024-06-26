import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user.module';
import { ManagerModule } from './module/manager.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './module/order.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }), // Configure .env loading
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    ManagerModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    try {
      // הודעה כאשר התחברות למסד הנתונים מוצלחת
      console.log('Connected to MongoDB successfully!');
    } catch (error) {
      // הודעת שגיאה אם יש בעיה בהתחברות למסד הנתונים
      console.error('Failed to connect to MongoDB:', error);
    }
  }
}
