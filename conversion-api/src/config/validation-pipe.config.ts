import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';

export const configureValidationPipe = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        const message =
          Array.isArray(errors) && errors.length
            ? errors
                .map(
                  (err) =>
                    `${err.property}: ${Object.values(err.constraints).join(
                      ', ',
                    )}`,
                )
                .join(', ')
            : 'Erro desconhecido';

        return new BadRequestException({
          message,
          error: 'Bad Request',
        });
      },
    }),
  );
};
