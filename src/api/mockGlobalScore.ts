import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import MOCK_GLOBAL_SCORE from './global-score.json'
import { GlobalScore } from './GlobalScore.model'

const mockGlobalScore = async (): Promise<GlobalScore | undefined> => {
  const mock = new MockAdapter(axios)
  mock.onGet(`/common-workflow/api/customer`).reply(200, MOCK_GLOBAL_SCORE)
  return await axios.get(`/common-workflow/api/customer`)
}

export default mockGlobalScore
