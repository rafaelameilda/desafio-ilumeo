import { Module } from '@nestjs/common'

import { UserSurveyResponseRepository } from './user-survey-response/user-survey-response.repository'

@Module({
  providers: [UserSurveyResponseRepository],
  exports: [UserSurveyResponseRepository],
})
export class RepositoriesModule {}
