import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const configureSwagger = async (app: INestApplication) => {
  if (process.env.ACTIVE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Conversion API')
      .setVersion('1.0.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
};
