import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { configureServer } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureServer(app);
  await app.listen(3000);
}
bootstrap();
