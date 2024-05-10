'use client'

import React from 'react'
import Blossom3 from '../../../public/Blossom3.png'
import Image from 'next/image'

interface Props {
  onClick: (index: number) => void
  card: number
  index: number
  isInactive: boolean
  isFlipped: boolean
  isDisabled: boolean
}

const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled }: Props) => {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index)
  }

  return (
    <div
      className={`relative w-24 h-36 shadow-lg shadow-red-950	rounded-md ${
        isFlipped && 'transition-all duration - 500 [transform-style:preserve-3d] rotate-y-180'
      } ${isInactive && 'opacity-0 disable'}`}
      onClick={!isInactive ? handleClick : undefined}
    >
      <div className={`absolute w-24 h-36 backface-hidden`}>
        <Image src={Blossom3} alt='eggplant' fill />
      </div>
      <div className={`absolute w-24 h-36 rotate-y-180 backface-hidden bg-pink-600`}>
        <div
          className={
            'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-5xl text-white'
          }
        >
          {card}
        </div>
      </div>
    </div>
  )
}

export default Card
