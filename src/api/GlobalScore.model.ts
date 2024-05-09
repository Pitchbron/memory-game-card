export interface GlobalScoreResponse {
  score: number | null
}

export interface GlobalScore {
  score: number | undefined
}

const mapGlobalScore = (response: GlobalScoreResponse): GlobalScore => {
  return {
    score: response.score ?? undefined,
  }
}

export default mapGlobalScore
