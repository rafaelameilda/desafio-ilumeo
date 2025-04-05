import { Controller, Get, Query } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'

import { GetConversionEvolutionRequest } from './requests'
import { GetConversionEvolutionResponse } from './responses'
import { GetConversionEvolutionUseCase } from './use-cases'

@ApiTags('user-engagement')
@Controller('v1/user-engagement')
export class UserEngagementController {
  constructor(private readonly getConversionEvolutionUseCase: GetConversionEvolutionUseCase) {}

  @Get('/conversion-evolution')
  @ApiOperation({ summary: 'Obter evolução da taxa de conversão por canal' })
  @ApiOkResponse({ type: GetConversionEvolutionResponse })
  async getConversionEvolution(@Query() query: GetConversionEvolutionRequest) {
    const result = await this.getConversionEvolutionUseCase.execute(query)

    return GetConversionEvolutionResponse.fromList(result)
  }
}
