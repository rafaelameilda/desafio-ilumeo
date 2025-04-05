import { Test, TestingModule } from '@nestjs/testing'

import { CacheStorageProvider } from '@core/providers'
import { UserSurveyResponse, UserSurveyResponseRepository } from '@core/repositories'

import { GetConversionEvolutionUseCase } from '@src/routes/user-survey-response/use-cases'

describe('GetConversionEvolutionUseCase', () => {
  let useCase: GetConversionEvolutionUseCase
  let repository: UserSurveyResponseRepository
  let cache: CacheStorageProvider

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetConversionEvolutionUseCase,
        {
          provide: UserSurveyResponseRepository,
          useValue: {
            getEvolutionRate: jest.fn(),
          },
        },
        {
          provide: CacheStorageProvider,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile()

    useCase = module.get(GetConversionEvolutionUseCase)
    repository = module.get(UserSurveyResponseRepository)
    cache = module.get(CacheStorageProvider)
  })

  it('retorna do cache se existir', async () => {
    const fake = [{ origin: 'wpp', response_date: '2024-01-01' }]
    jest.spyOn(cache, 'get').mockResolvedValue(fake)

    const result = await useCase.execute({ origin: 'wpp' })

    expect(result).toEqual(fake)
    expect(cache.get).toHaveBeenCalled()
    expect(repository.getEvolutionRate).not.toHaveBeenCalled()
  })

  it('busca no repo se nao tiver cache e salva', async () => {
    jest.spyOn(cache, 'get').mockResolvedValue(null)

    const data = [{ origin: 'email', response_date: '2024-01-01' }] as UserSurveyResponse[]

    jest.spyOn(repository, 'getEvolutionRate').mockResolvedValue(data)

    const setSpy = jest.spyOn(cache, 'set').mockResolvedValue(undefined)

    const result = await useCase.execute({ origin: 'email' })

    expect(result).toEqual(data)
    expect(repository.getEvolutionRate).toHaveBeenCalled()
    expect(setSpy).toHaveBeenCalled()
  })

  it('gera chave de cache com todos os parâmetros definidos', async () => {
    jest.spyOn(cache, 'get').mockResolvedValue(null)
    const data = [] as UserSurveyResponse[]
    jest.spyOn(repository, 'getEvolutionRate').mockResolvedValue(data)
    const setSpy = jest.spyOn(cache, 'set').mockResolvedValue(undefined)

    const result = await useCase.execute({
      origin: 'email',
      startDate: '2024-01-01',
      endDate: '2024-01-10',
    })

    expect(result).toEqual(data)
    expect(setSpy).toHaveBeenCalledWith('conversion-evolution:email:2024-01-01:2024-01-10', data)
  })

  it('usa a chave de cache padrão quando os parâmetros são undefined', async () => {
    jest.spyOn(cache, 'get').mockResolvedValue(null)
    const data = [] as UserSurveyResponse[]
    jest.spyOn(repository, 'getEvolutionRate').mockResolvedValue(data)

    const setSpy = jest.spyOn(cache, 'set').mockResolvedValue(undefined)

    const result = await useCase.execute({} as any)

    expect(result).toEqual(data)
    expect(setSpy).toHaveBeenCalledWith('conversion-evolution:all:none:none', data)
  })
})
