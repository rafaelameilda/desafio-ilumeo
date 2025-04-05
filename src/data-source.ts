import * as dotenv from 'dotenv'
import { join } from 'path'
import { DataSource } from 'typeorm'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrations: [join(__dirname, 'migrations/*.{ts,js}')],
  entities: [join(__dirname, '**/*.entity.{ts,js}')],
})
