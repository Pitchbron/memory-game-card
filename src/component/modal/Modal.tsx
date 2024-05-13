'use client'

import React from 'react'
import powerpuff from '../../../public/Powerpuff.png'
import Image from 'next/image'

interface Props {
  showModal: boolean
  handleRestart: () => void
  moves: number
  bestScore: number | string
}

const Modal = ({ showModal, handleRestart, moves, bestScore }: Props) => {
  return (
    <div
      className={`fixed left-1/2 top-1/2 z-50 m-auto h-full w-full -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-[2px] ${
        showModal ? 'block' : 'hidden'
      }`}
      onClick={handleRestart}
    >
      <div
        className={'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex'}
        onClick={(event) => event.stopPropagation()}
      >
        <div className='absolute h-full w-48 left-1/2 -translate-x-1/2 top-1/2 -translate-y-48'>
          <Image src={powerpuff} alt='powerpuff' sizes='(min-width: 768px) 100vw, 50vw, 33vw' />
        </div>
        <div className='w-[327px] rounded-xl border border-white bg-sb60 px-md py-lg text-center h-44 p-2 bg-slate-50 justify-center z-10'>
          <div className='text-base font-semibold m-2'>Hurray!!! You completed the challenge</div>
          <div className='whitespace-break-spaces text-body2 font-medium'>
            You completed the game in {moves} moves. Your best score is {bestScore} moves.
          </div>
          <button
            className='w-[40%] items-center justify-center rounded-full border-4 border-white px-md bg-pink-400 h-20 mt-4 font-semibold'
            onClick={handleRestart}
            type='button'
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
