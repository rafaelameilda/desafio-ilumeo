import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '@src/app.module'

describe('UserEngagementController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/v1/user-engagement/conversion-evolution (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/v1/user-engagement/conversion-evolution')
      .query({ origin: 'wpp' })
      .expect(200)

    expect(res.body.data).toBeInstanceOf(Array)
    expect(res.body.data[0]).toHaveProperty('origin')
    expect(res.body.data[0]).toHaveProperty('responseDate')
    expect(res.body.data[0]).toHaveProperty('conversionRate')
  })

  afterAll(async () => {
    await app.close()
  })
})
