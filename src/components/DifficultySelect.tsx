import { Difficulty } from '@/types'

interface DifficultySelectProps {
  difficulty: Difficulty
  onSelect: (difficulty: Difficulty) => void
}

export default function DifficultySelect({ difficulty, onSelect }: DifficultySelectProps) {
  const difficulties: { value: Difficulty; label: string; description: string }[] = [
    { 
      value: 'easy', 
      label: 'Easy', 
      description: '6 pairs (12 cards)' 
    },
    { 
      value: 'medium', 
      label: 'Medium', 
      description: '10 pairs (20 cards)' 
    },
    { 
      value: 'hard', 
      label: 'Hard', 
      description: '15 pairs (30 cards)' 
    }
  ]

  return (
    <div className="space-y-2">
      {difficulties.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value)}
          className={`
            w-full p-3 rounded-lg text-left transition-colors
            ${difficulty === option.value 
              ? 'bg-indigo-100 border-2 border-indigo-500 text-indigo-800' 
              : 'bg-gray-100 border-2 border-transparent hover:bg-gray-200'
            }
          `}
        >
          <div className="font-semibold">{option.label}</div>
          <div className="text-sm text-gray-600">{option.description}</div>
        </button>
      ))}
    </div>
  )
}