import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator'

import { ChannelOrigin } from '@core/repositories'

export class GetConversionEvolutionRequest {
  @ApiPropertyOptional({ example: '2024-01-01' })
  @IsOptional()
  @IsDateString()
  startDate?: string

  @ApiPropertyOptional({ example: '2024-03-31' })
  @IsOptional()
  @IsDateString()
  endDate?: string

  @ApiPropertyOptional({ example: 'whatsapp' })
  @IsOptional()
  @IsEnum(ChannelOrigin)
  origin?: string
}
