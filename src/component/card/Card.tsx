'use client'

import React from 'react'
import eggplant from '../../../public/eggplant.png'
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

  console.log(index, isFlipped, isDisabled)
  return (
    <div
      className={`relative w-10 h-10 ${
        isFlipped &&
        'transition-all duration-500 [transform-style:preserve-3d] rotate-y-180 backface-hidden'
      } ${isInactive && 'opacity-0 disable'}`}
      onClick={!isInactive ? handleClick : undefined}
    >
      <div className={`absolute w-30 h-10`}>
        <Image src={eggplant} alt='eggplant' />
      </div>
      <div className={`absolute w-30 h-10 rotate-y-180 `}>{card}</div>
    </div>
  )
}

export default Card
