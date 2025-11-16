import { useState, useEffect } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import GameBoard from '@/components/GameBoard'
import DifficultySelect from '@/components/DifficultySelect'
import Scoreboard from '@/components/Scoreboard'
import Celebration from '@/components/Celebration'
import { Card, Difficulty, GameState } from '@/types'
import { generateCards } from '@/utils/gameUtils'

export default function App() {
  const [difficulty, setDifficulty] = useLocalStorage<Difficulty>('memory-difficulty', 'easy')
  const [cards, setCards] = useState<Card[]>([])
  const [flippedIndices, setFlippedIndices] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number>(0)
  const [moves, setMoves] = useState<number>(0)
  const [gameState, setGameState] = useState<GameState>('menu')
  const [highScores, setHighScores] = useLocalStorage<Record<Difficulty, number>>('memory-high-scores', {
    easy: 0,
    medium: 0,
    hard: 0
  })

  // Initialize or reset the game
  useEffect(() => {
    if (gameState === 'playing') {
      const newCards = generateCards(difficulty)
      setCards(newCards)
      setFlippedIndices([])
      setMatchedPairs(0)
      setMoves(0)
    }
  }, [difficulty, gameState])

  // Check for matches when two cards are flipped
  useEffect(() => {
    if (flippedIndices.length === 2) {
      // Increment moves counter
      setMoves(prev => prev + 1)
      
      const [firstIndex, secondIndex] = flippedIndices
      
      if (cards[firstIndex].value === cards[secondIndex].value) {
        // Match found
        const updatedCards = [...cards]
        updatedCards[firstIndex].matched = true
        updatedCards[secondIndex].matched = true
        setCards(updatedCards)
        setMatchedPairs(prev => prev + 1)
        setFlippedIndices([])
      } else {
        // No match, flip cards back after delay
        const timeoutId = setTimeout(() => {
          setFlippedIndices([])
        }, 1000)
        return () => clearTimeout(timeoutId)
      }
    }
  }, [flippedIndices, cards])

  // Check for game completion
  useEffect(() => {
    if (gameState === 'playing' && matchedPairs > 0) {
      const totalPairs = cards.length / 2
      
      if (matchedPairs === totalPairs) {
        // Game completed
        const currentHighScore = highScores[difficulty]
        
        if (currentHighScore === 0 || moves < currentHighScore) {
          // New high score
          setHighScores({
            ...highScores,
            [difficulty]: moves
          })
        }
        
        setGameState('completed')
      }
    }
  }, [matchedPairs, cards.length, difficulty, moves, highScores, setHighScores, gameState])

  const handleCardClick = (index: number) => {
    // Ignore clicks if:
    // - Already two cards flipped
    // - Clicking an already flipped card
    // - Clicking a matched card
    if (
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      cards[index].matched
    ) {
      return
    }

    setFlippedIndices(prev => [...prev, index])
  }

  const startGame = () => {
    setGameState('playing')
  }

  const returnToMenu = () => {
    setGameState('menu')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">Memory Matching Game</h1>
          {gameState !== 'menu' && (
            <Scoreboard 
              moves={moves} 
              matchedPairs={matchedPairs} 
              totalPairs={cards.length / 2} 
              difficulty={difficulty}
              highScore={highScores[difficulty]}
            />
          )}
        </header>

        <main>
          {gameState === 'menu' && (
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-center mb-4">Choose Difficulty</h2>
              <DifficultySelect 
                difficulty={difficulty} 
                onSelect={setDifficulty}
              />
              <button
                onClick={startGame}
                className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Start Game
              </button>
            </div>
          )}

          {gameState === 'playing' && (
            <div>
              <GameBoard 
                cards={cards} 
                flippedIndices={flippedIndices} 
                onCardClick={handleCardClick} 
              />
              <div className="text-center mt-4">
                <button
                  onClick={returnToMenu}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Back to Menu
                </button>
              </div>
            </div>
          )}

          {gameState === 'completed' && (
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto text-center">
              <Celebration />
              <h2 className="text-2xl font-bold text-indigo-800 mb-2">Congratulations!</h2>
              <p className="text-gray-700 mb-4">
                You completed the game in <span className="font-semibold">{moves}</span> moves!
              </p>
              {highScores[difficulty] === moves && (
                <p className="text-indigo-600 font-semibold mb-4">New High Score! 🎉</p>
              )}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setGameState('playing')}
                  className="py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Play Again (Same Difficulty)
                </button>
                <button
                  onClick={returnToMenu}
                  className="py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Back to Menu
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}