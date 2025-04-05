import { Module } from '@nestjs/common'

import { GetConversionEvolutionUseCase } from './use-cases'
import { UserEngagementController } from './user-engagement.controller'

@Module({
  providers: [GetConversionEvolutionUseCase],
  controllers: [UserEngagementController],
})
export class UserEngagementModule {}
