import { Card as CardType } from '@/types'
import Card from './Card'

interface GameBoardProps {
  cards: CardType[]
  flippedIndices: number[]
  onCardClick: (index: number) => void
}

export default function GameBoard({ cards, flippedIndices, onCardClick }: GameBoardProps) {
  // Determine grid columns based on the number of cards
  const gridCols = cards.length <= 12 ? 'grid-cols-4' : 'grid-cols-6'
  
  return (
    <div className={`grid ${gridCols} gap-3 md:gap-4`}>
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          isFlipped={flippedIndices.includes(index) || card.matched}
          onClick={() => onCardClick(index)}
        />
      ))}
    </div>
  )
}