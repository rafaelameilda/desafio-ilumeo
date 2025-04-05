import { Injectable } from '@nestjs/common'

import { CacheStorageProvider } from '@core/providers'
import {
  EvolutionRateParams,
  UserSurveyResponse,
  UserSurveyResponseRepository,
} from '@core/repositories'

@Injectable()
export class GetConversionEvolutionUseCase {
  constructor(
    private readonly usersRepository: UserSurveyResponseRepository,
    private readonly cacheStorageProvider: CacheStorageProvider,
  ) {}

  async execute(params: EvolutionRateParams): Promise<UserSurveyResponse[]> {
    const cacheKey = this.buildCacheKey(params)

    const cached = await this.cacheStorageProvider.get<UserSurveyResponse[]>(cacheKey)
    if (cached) return cached

    const users = await this.usersRepository.getEvolutionRate(params)

    await this.cacheStorageProvider.set(cacheKey, users)

    return users
  }

  private buildCacheKey(params: EvolutionRateParams): string {
    const { origin, startDate, endDate } = params
    return `conversion-evolution:${origin ?? 'all'}:${startDate ?? 'none'}:${endDate ?? 'none'}`
  }
}
