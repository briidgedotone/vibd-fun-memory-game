import { Card as CardType } from '@/types'
import { getEmojiForValue } from '@/utils/gameUtils'

interface CardProps {
  card: CardType
  isFlipped: boolean
  onClick: () => void
}

export default function Card({ card, isFlipped, onClick }: CardProps) {
  const handleClick = () => {
    if (!card.matched && !isFlipped) {
      onClick()
    }
  }

  const emoji = getEmojiForValue(card.value)

  return (
    <div 
      onClick={handleClick}
      className={`
        h-20 md:h-24 w-full cursor-pointer preserve-3d
        ${card.matched ? 'animate-match' : isFlipped ? 'animate-flip' : ''}
      `}
    >
      <div className={`relative w-full h-full transition-transform duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Card Back */}
        <div className="card-back absolute w-full h-full flex items-center justify-center backface-hidden">
          <span className="text-white text-2xl">?</span>
        </div>

        {/* Card Front */}
        <div className="card-front absolute w-full h-full backface-hidden">
          <span className="text-4xl">{emoji}</span>
        </div>
      </div>
    </div>
  )
}