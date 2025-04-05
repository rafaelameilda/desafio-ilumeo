import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '@core/core.module';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CoreModule, RoutesModule],
  controllers: [AppController],
})
export class AppModule {}
