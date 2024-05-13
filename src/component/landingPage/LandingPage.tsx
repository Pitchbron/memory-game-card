'use client'

import { useEffect, useRef, useState } from 'react'
import Card from '../card/Card'
import mockGlobalScore from '../../api/mockGlobalScore'
import Modal from '../modal/Modal'

interface ClearCardsPorps {
  [key: number]: boolean
}

const NUMBER = [1, 2, 3, 4, 5, 6]

const LandingPage = () => {
  //--------------fetch API-----------------
  const [globalScore, setGlobalScore] = useState<number | undefined>(undefined)
  const uu = async () => {
    return await mockGlobalScore().then((res) => {
      setGlobalScore(res?.data.score)
    })
  }
  useEffect(() => {
    uu()
  }, [])

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
  const [bestScore, setBestScore] = useState(
    window.localStorage.getItem('bestScore') || Number.POSITIVE_INFINITY
  )

  const timeout = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

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
    setMoves((moves) => moves + 1)
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index])
      disable()
    } else {
      clearTimeout(timeout.current)
      setOpenCards([index])
    }
  }

  useEffect(() => {
    let timeout: ReturnType<typeof setInterval> | undefined = undefined
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
      const highScore = Math.min(moves, +bestScore)
      setBestScore(highScore)
      window.localStorage.setItem('bestScore', `${highScore}`)
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
    setCards(shuffleCards(NUMBER))
  }

  return (
    <div className='App'>
      <div className='grid justify-items-center'>
        <div className='mt-8 mb-4 mx-10'>
          <div className='flex lg:block'>
            <div className='bg-gradient-to-r from-pink-600 from-30% via-red-500 via-70% to-black inline-block to-90% text-transparent bg-clip-text font-bold text-5xl sm:text-3xl py-3 lg:pb-0 sm:pb-0'>
              {'BALLYPUFF GIRL\xa0'}
            </div>
            <div className='font-bold text-5xl sm:text-3xl py-3 sm:pt-0'>
              {': the Flip card game'}
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <div>
              <div className='text-xl mb-1 sm:text-base'>
                Select two cards with same content consequtively to make them vanish.
              </div>
              <div className='flex divide-x-2 divide-pink-700 sm:block sm:divide-x-0 sm:p-4 sm:bg-white sm:mt-3'>
                <div className='font-bold text-xl pr-4 sm:pr-0 sm:text-lg'>
                  Move Count : {moves}
                </div>
                <div className='font-bold text-xl text-violet-600 px-4 sm:px-0 sm:text-lg'>
                  Your Best Score :{' '}
                  {bestScore === Infinity || bestScore === 'Infinity' ? ' - ' : bestScore}
                </div>
                <div className='font-bold text-xl text-blue-600 px-4 sm:px-0 sm:text-lg'>
                  Global Score : {globalScore}
                </div>
              </div>
            </div>

            <button
              className='rounded-full w-36 h-10 bg-pink-500 hover:bg-pink-600 active:bg-pink-700 focus:outline-none focus:ring focus:ring-violet-300 text-white sm:h-20 sm:w-20 sm:absolute sm:translate-x-52 sm:translate-y-8'
              onClick={handleRestart}
            >
              Restart
            </button>
          </div>
        </div>
      </div>
      <div className='absolute w-full h-48 bg-sky-200 translate-y-32' />
      <div className='absolute w-full h-48 bg-emerald-200 translate-y-48' />
      <div className='absolute w-full h-48 bg-pink-600 translate-y-40' />
      <div className='absolute grid justify-items-center left-1/2 transform -translate-x-1/2'>
        <div className='p-2 shadow-lg shadow-red-950 rounded-lg bg-white mx-10 sm:mx-0'>
          <div className='p-2 rounded-lg border-pink-500 border-8 px-10 sm:px-3'>
            <div className='grid gap-x-28 gap-y-4 grid-cols-4 sm:grid-cols-3 justify-items-center m-10'>
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
      </div>
      <Modal
        showModal={showModal}
        handleRestart={handleRestart}
        moves={moves}
        bestScore={bestScore}
      />
    </div>
  )
}

export default LandingPage
