'use client'

import { useEffect, useRef, useState } from 'react'
import Card from '../component/card/Card'
import mockGlobalScore from '../api/mockGlobalScore'

interface ClearCardsPorps {
  [key: number]: boolean
}

const NUMBER = [1, 2, 3, 4, 5, 6]

const Home = () => {
  const [globalScore, setGlobalScore] = useState<number | undefined>(undefined)
  const uu = async () => {
    const eiei = await mockGlobalScore().then((res) => {
      setGlobalScore(res?.score)
    })
    return eiei
  }

  //--------------rearrange card-----------------
  const shuffleCards = (array: number[]) => {
    const shuffled = [...array, ...array].sort(() => Math.random() - 0.5)
    return shuffled
  }

  const [cards, setCards] = useState(() => shuffleCards(NUMBER))
  const [openCards, setOpenCards] = useState<number[]>([])
  const [clearedCards, setClearedCards] = useState<ClearCardsPorps>({})
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false)
  const [moves, setMoves] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [bestScore, setBestScore] = useState(20)

  const timeout = useRef<ReturnType<typeof setInterval> | any>(null)

  const disable = () => {
    setShouldDisableAllCards(true)
  }
  const enable = () => {
    setShouldDisableAllCards(false)
  }

  const evaluate = () => {
    const [first, second] = openCards
    enable()
    if (cards[first] === cards[second]) {
      setClearedCards((prev) => ({ ...prev, [cards[first]]: true }))
      setOpenCards([])
      return
    }
    timeout.current = setTimeout(() => {
      setOpenCards([])
    }, 500)
  }

  const handleCardClick = (index: number) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index])
      setMoves((moves) => moves + 1)
      disable()
    } else {
      clearTimeout(timeout.current)
      setOpenCards([index])
    }
  }

  useEffect(() => {
    let timeout: any = null
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [openCards])

  const checkIsFlipped = (index: number) => {
    return openCards.includes(index)
  }

  const checkIsInactive = (card: number) => {
    return Boolean(clearedCards[card])
  }

  //--------------Action after complete game-----------------
  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === NUMBER.length) {
      setShowModal(true)
      const highScore = Math.min(moves, bestScore)
      setBestScore(highScore)
    }
  }

  useEffect(() => {
    checkCompletion()
  }, [clearedCards])

  const handleRestart = () => {
    setClearedCards({})
    setOpenCards([])
    setShowModal(false)
    setMoves(0)
    setShouldDisableAllCards(false)
    // set a shuffled deck of cards
    setCards(shuffleCards(NUMBER))
  }

  return (
    <div className='App'>
      <div className='grid justify-items-center'>
        <div className='my-8'>
          <div className='bg-gradient-to-r from-pink-600 from-10% via-red-500 via-20% to-black inline-block to-50% text-transparent bg-clip-text font-bold text-5xl py-3'>
            BALLYPUFF GAY : the Flip card game
          </div>
          <div className='flex justify-between items-center'>
            <div>
              <div className='text-xl'>
                Select two cards with same content consequtively to make them vanish.
              </div>
              <div className='font-bold text-xl'>Move Count : {moves}</div>
            </div>

            <button
              className='rounded-full w-36 h-10 bg-pink-500 hover:bg-pink-600 active:bg-pink-700 focus:outline-none focus:ring focus:ring-violet-300 text-white'
              onClick={handleRestart}
            >
              Restart
            </button>
          </div>
        </div>
      </div>
      <div className='p-2 mx-64 shadow-lg shadow-red-950 rounded-lg bg-white'>
        <div className='p-2 rounded-lg border-pink-500 border-8'>
          <div className='grid gap-x-4 gap-y-4 grid-cols-4 justify-items-center m-10'>
            {cards.map((card, index) => {
              return (
                <Card
                  key={index}
                  card={card}
                  index={index}
                  isDisabled={shouldDisableAllCards}
                  isFlipped={checkIsFlipped(index)}
                  isInactive={checkIsInactive(card)}
                  onClick={handleCardClick}
                />
              )
            })}
          </div>
        </div>
      </div>

      <div
        className={`fixed left-1/2 top-1/2 z-50 m-auto h-full w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-[2px] ${
          showModal ? 'block' : 'hidden'
        }`}
        onClick={handleRestart}
      >
        <div
          className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex'}
          onClick={(event) => event.stopPropagation()}
        >
          <div className='w-[327px] rounded-xl border border-s20 bg-sb60 px-md py-lg text-center'>
            <div className='mb-lg gap-sm flex-col flex'>
              <div className='text-headline1 font-semibold text-s20'>
                Hurray!!! You completed the challenge
              </div>
              <div className='whitespace-break-spaces text-body2 font-medium text-sl50'>
                You completed the game in {moves} moves. Your best score is {bestScore} moves.
              </div>
            </div>
            <button
              className='w-[20%] flex-row items-center justify-center rounded-full border px-md font-sukhumvit gap-sm flex'
              onClick={handleRestart}
              type='button'
            >
              Restart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
