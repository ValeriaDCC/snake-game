import { useState, useEffect, useCallback } from 'react'

const ROWS = 17
const COLS = 17
const SPEED = 150

const INITIAL_SNAKE = [
  { x: 8, y: 8 },
  { x: 7, y: 8 },
  { x: 6, y: 8 },
]

function randomFood(snake) {
  let pos
  do {
    pos = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    }
  } while (snake.some(s => s.x === pos.x && s.y === pos.y))
  return pos
}

export function useSnake() {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [dir, setDir] = useState({ x: 1, y: 0 })
  const [food, setFood] = useState(() => randomFood(INITIAL_SNAKE))
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE)
    setDir({ x: 1, y: 0 })
    setFood(randomFood(INITIAL_SNAKE))
    setScore(0)
    setGameOver(false)
  }, [])

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
    if (gameOver) return

    const loop = setInterval(() => {
      setSnake(prev => {
        const head = {
          x: prev[0].x + dir.x,
          y: prev[0].y + dir.y,
        }

        if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
          setGameOver(true)
          return prev
        }

        if (prev.some(s => s.x === head.x && s.y === head.y)) {
          setGameOver(true)
          return prev
        }

        const ateFood = head.x === food.x && head.y === food.y
        const newSnake = ateFood
          ? [head, ...prev]
          : [head, ...prev.slice(0, -1)]

        if (ateFood) {
          setScore(s => s + 10)
          setFood(randomFood(newSnake))
        }

        return newSnake
      })
    }, SPEED)

    return () => clearInterval(loop)
  }, [dir, food, gameOver])

  return { snake, food, score, gameOver, resetGame }
}