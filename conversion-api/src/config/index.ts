import { configureSwagger } from './swagger.config';
import { configureValidationPipe } from './validation-pipe.config';

export const configureServer = (app) => {
  configureSwagger(app);
  app.enableCors();
  configureValidationPipe(app);
};
