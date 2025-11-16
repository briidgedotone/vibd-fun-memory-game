import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'

export default function Celebration() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [show, setShow] = useState(true)

  useEffect(() => {
    // Get window dimensions for confetti
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    // Hide confetti after 5 seconds
    const timeoutId = setTimeout(() => {
      setShow(false)
    }, 5000)

    return () => {
      window.removeEventListener('resize', updateDimensions)
      clearTimeout(timeoutId)
    }
  }, [])

  if (!show) {
    return null
  }

  return (
    <Confetti
      width={dimensions.width}
      height={dimensions.height}
      recycle={false}
      numberOfPieces={200}
      gravity={0.2}
    />
  )
}