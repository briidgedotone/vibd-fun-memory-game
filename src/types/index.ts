export interface Card {
  id: string
  value: number
  matched: boolean
}

export type Difficulty = 'easy' | 'medium' | 'hard'

export type GameState = 'menu' | 'playing' | 'completed'