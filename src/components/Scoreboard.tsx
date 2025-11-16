import { Difficulty } from '@/types'

interface ScoreboardProps {
  moves: number
  matchedPairs: number
  totalPairs: number
  difficulty: Difficulty
  highScore: number
}

export default function Scoreboard({ moves, matchedPairs, totalPairs, difficulty, highScore }: ScoreboardProps) {
  const difficultyLabel = {
    'easy': 'Easy',
    'medium': 'Medium',
    'hard': 'Hard'
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-4">
      <div className="bg-white px-4 py-2 rounded-full shadow">
        <span className="text-gray-600 mr-2">Difficulty:</span>
        <span className="font-medium text-indigo-700">{difficultyLabel[difficulty]}</span>
      </div>
      
      <div className="bg-white px-4 py-2 rounded-full shadow">
        <span className="text-gray-600 mr-2">Moves:</span>
        <span className="font-medium text-indigo-700">{moves}</span>
      </div>
      
      <div className="bg-white px-4 py-2 rounded-full shadow">
        <span className="text-gray-600 mr-2">Pairs:</span>
        <span className="font-medium text-indigo-700">{matchedPairs}/{totalPairs}</span>
      </div>
      
      <div className="bg-white px-4 py-2 rounded-full shadow">
        <span className="text-gray-600 mr-2">Best:</span>
        <span className="font-medium text-indigo-700">{highScore > 0 ? highScore : '—'}</span>
      </div>
    </div>
  )
}