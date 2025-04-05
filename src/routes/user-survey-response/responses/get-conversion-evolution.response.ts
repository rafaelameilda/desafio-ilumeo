import { ApiProperty } from '@nestjs/swagger'
import { DateTime } from 'luxon'

import { ChannelOrigin, UserSurveyResponse } from '@core/repositories'

const normalizeToDateOnly = (input: string | Date): string => {
  const date = typeof input === 'string' ? DateTime.fromISO(input) : DateTime.fromJSDate(input)

  return date.isValid ? date.toFormat('yyyy-MM-dd') : 'invalid-date'
}

class ConversionEvolutionItem {
  @ApiProperty({ enum: ChannelOrigin })
  origin: string

  @ApiProperty({ example: '2024-04-05T04:00:00.000Z' })
  responseDate: string

  @ApiProperty({ example: 7813 })
  totalResponses: number

  @ApiProperty({ example: 64 })
  totalConverted: number

  @ApiProperty({ example: 0.82 })
  conversionRate: number

  constructor(props: UserSurveyResponse) {
    this.origin = props.origin
    this.responseDate = normalizeToDateOnly(props.response_date)
    this.totalResponses = Number(props.total_responses)
    this.totalConverted = Number(props.total_converted)
    this.conversionRate = Number(props.conversion_rate)
  }
}

export class GetConversionEvolutionResponse {
  @ApiProperty({ type: [ConversionEvolutionItem] })
  data: ConversionEvolutionItem[]

  constructor(data: ConversionEvolutionItem[]) {
    this.data = data
  }

  static fromList(raw: any[]): GetConversionEvolutionResponse {
    const items = raw.map(item => new ConversionEvolutionItem(item))
    return new GetConversionEvolutionResponse(items)
  }
}
