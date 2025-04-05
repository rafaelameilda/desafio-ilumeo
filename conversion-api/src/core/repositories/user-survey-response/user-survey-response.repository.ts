import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

export interface EvolutionRateParams {
  origin?: string
  startDate?: string
  endDate?: string
}

export enum ChannelOrigin {
  EMAIL = 'email',
  MOBILE = 'MOBILE',
  WPP = 'wpp',
}

export interface UserSurveyResponse {
  origin: string
  response_date: string
  total_responses: string | number
  total_converted: string | number
  conversion_rate: string | number
}

@Injectable()
export class UserSurveyResponseRepository {
  constructor(private readonly dataSource: DataSource) {}

  async getEvolutionRate(params: EvolutionRateParams): Promise<UserSurveyResponse[]> {
    const { origin, startDate, endDate } = params

    const query = this.dataSource
      .createQueryBuilder()
      .select([
        'origin',
        'response_date',
        'total_responses',
        'total_converted',
        `ROUND((total_converted::decimal / NULLIF(total_responses, 0)) * 100, 2) AS conversion_rate`,
      ])
      .from('inside.mv_conversion_by_channel', 'conversion')

    if (origin) {
      query.andWhere('origin = :origin', { origin })
    }

    if (startDate) {
      query.andWhere('response_date >= :startDate', { startDate })
    }

    if (endDate) {
      query.andWhere('response_date <= :endDate', { endDate })
    }

    query.orderBy('origin').addOrderBy('response_date')

    return await query.getRawMany()
  }
}
