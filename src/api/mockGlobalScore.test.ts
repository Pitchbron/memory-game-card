import mockGlobalScore from './mockGlobalScore'

describe('fetchFromGlobalScore', () => {
  beforeAll(() => mockGlobalScore())

  it('should render success with data', async () => {
    const result = await mockGlobalScore().then((res) => {
      return res?.data.score
    })

    expect(result).toEqual('20')
  })
})
