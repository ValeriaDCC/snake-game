import { useState, useEffect } from 'react'
import './App.css'

const ROWS = 17
const COLS = 17

const INITIAL_SNAKE = [
  { x: 8, y: 8 },
  { x: 7, y: 8 },
  { x: 6, y: 8 },
]

const INITIAL_FOOD = { x: 12, y: 8 }
const SPEED = 150

function App() {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [dir, setDir] = useState({ x: 1, y: 0 })
  const [food, setFood] = useState(INITIAL_FOOD)

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowUp')    setDir(d => d.y === 1  ? d : { x: 0, y: -1 })
      if (e.key === 'ArrowDown')  setDir(d => d.y === -1 ? d : { x: 0, y: 1 })
      if (e.key === 'ArrowLeft')  setDir(d => d.x === 1  ? d : { x: -1, y: 0 })
      if (e.key === 'ArrowRight') setDir(d => d.x === -1 ? d : { x: 1, y: 0 })
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    const loop = setInterval(() => {
      setSnake(prev => {
        const head = {
          x: prev[0].x + dir.x,
          y: prev[0].y + dir.y,
        }
        const newSnake = [head, ...prev.slice(0, -1)]
        return newSnake
      })
    }, SPEED)
    return () => clearInterval(loop)
  }, [dir])

  const isSnake = (row, col) =>
    snake.some(s => s.x === col && s.y === row)

  const isFood = (row, col) =>
    food.x === col && food.y === row

  return (
    <div className="game-container">
      <h1>Snake Game</h1>
      <div className="board">
        {Array.from({ length: ROWS }, (_, row) =>
          Array.from({ length: COLS }, (_, col) => (
            <div
              key={`${row}-${col}`}
              className={`cell ${isSnake(row, col) ? 'snake' : ''} ${isFood(row, col) ? 'food' : ''}`}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default App