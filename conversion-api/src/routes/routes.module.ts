import { Module } from '@nestjs/common'

import { UserEngagementModule } from './user-survey-response/user-engagement.module'

@Module({
  imports: [UserEngagementModule],
})
export class RoutesModule {}
