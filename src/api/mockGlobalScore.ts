import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import MOCK_GLOBAL_SCORE from './global-score.json'
import mapGlobalScore, { GlobalScore, GlobalScoreResponse } from './GlobalScore.model'

const mockGlobalScore = async (): Promise<GlobalScore | undefined> => {
  let a
  const mock = new MockAdapter(axios)
  mock.onGet(`/common-workflow/api/customer`).reply(200, MOCK_GLOBAL_SCORE)
  try {
    const response: GlobalScoreResponse = await axios
      .get(`/common-workflow/api/customer`)
      .then((response) => {
        return (a = response.data)
      })

    return response ? mapGlobalScore(response) : undefined
  } catch (error) {
    console.log(error)
  }
}

export default mockGlobalScore
