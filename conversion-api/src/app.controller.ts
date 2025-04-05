import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('app')
export class AppController {
  @Get('healthcheck')
  @ApiOperation({ summary: 'Validar a saúde do serviço' })
  @ApiOkResponse({ type: String })
  async healthCheck(): Promise<string> {
    return 'OK';
  }
}
