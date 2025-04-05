import { Test, TestingModule } from '@nestjs/testing'
import { DataSource } from 'typeorm'

import { RefreshMaterializedViewJob } from '@core/jobs'

describe('RefreshMaterializedViewJob', () => {
  let job: RefreshMaterializedViewJob
  let dataSource: DataSource

  beforeEach(async () => {
    const mockQuery = jest.fn()
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RefreshMaterializedViewJob,
        {
          provide: DataSource,
          useValue: {
            manager: {
              query: mockQuery,
            },
          },
        },
      ],
    }).compile()

    job = module.get(RefreshMaterializedViewJob)
    dataSource = module.get(DataSource)
  })

  it('deve rodar a query com sucesso', async () => {
    const spy = jest.spyOn(dataSource.manager, 'query').mockResolvedValue(undefined)

    await job.handleCron()

    expect(spy).toHaveBeenCalledWith('REFRESH MATERIALIZED VIEW inside.mv_conversion_by_channel')
  })

  it('deve logar erro ao falhar', async () => {
    const error = new Error('fail')
    jest.spyOn(dataSource.manager, 'query').mockRejectedValue(error)

    const loggerSpy = jest.spyOn<any, any>(job['logger'], 'error')

    await job.handleCron()

    expect(loggerSpy).toHaveBeenCalledWith('❌ Error for refresh Materialized View', error.stack)
  })
})
