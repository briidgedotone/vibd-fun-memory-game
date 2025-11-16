import { Card, Difficulty } from '@/types'

// Function to generate cards based on difficulty level
export function generateCards(difficulty: Difficulty): Card[] {
  const pairs = difficulty === 'easy' ? 6 : difficulty === 'medium' ? 10 : 15
  
  // Generate pairs of cards with the same value
  const values = Array.from({ length: pairs }, (_, i) => i + 1)
  const cards: Card[] = []
  
  // Create two cards for each value (pair)
  values.forEach((value) => {
    cards.push(
      { id: `${value}-1`, value, matched: false },
      { id: `${value}-2`, value, matched: false }
    )
  })
  
  // Shuffle the cards using Fisher-Yates algorithm
  return shuffleArray(cards)
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  
  return newArray
}

// Map card values to emojis
export function getEmojiForValue(value: number): string {
  // Use a fixed set of emojis for consistency
  const emojis = [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', 
    '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔',
    '🐧', '🐦', '🦆', '🦉', '🦇', '🐺', '🐗', '🐴',
    '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🕷️',
    '🦂', '🦑', '🐙', '🦐', '🦞', '🦀', '🐠', '🐡',
    '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓',
    '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒',
    '🦘', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑'
  ]
  
  // Ensure value is within range of available emojis
  const index = (value - 1) % emojis.length
  return emojis[index]
}