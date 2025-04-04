import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserSurveyResponseEntity } from './user-survey-response.entity'

@Injectable()
export class SaleRepository {
  constructor(
    @InjectRepository(UserSurveyResponseEntity)
    private readonly userSurveyResponseEntity: Repository<UserSurveyResponseEntity>,
  ) {}

  async getEvolutionRate() {}
}
