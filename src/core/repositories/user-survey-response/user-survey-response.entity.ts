import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users_surveys_responses_aux', { schema: 'inside' })
export class UserSurveyResponseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  origin: string

  @Column()
  response_status_id: number

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date
}
