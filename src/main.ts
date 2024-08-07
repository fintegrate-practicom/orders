import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // לבדוק שזה עובד!!-הוספת הגדרת !!CORS לכל הדומיינים (למטרות פיתוח בלבד)
  app.enableCors();
  await app.listen(4000);
  console.log('Server is running on http://localhost:4000');
}
bootstrap();
