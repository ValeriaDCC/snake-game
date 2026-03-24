import './App.css'

const ROWS = 17
const COLS = 17

const INITIAL_SNAKE = [
  { x: 8, y: 8 },
  { x: 7, y: 8 },
  { x: 6, y: 8 },
]

const INITIAL_FOOD = { x: 12, y: 8 }

function App() {
  const isSnake = (row, col) =>
    INITIAL_SNAKE.some(s => s.x === col && s.y === row)

  const isFood = (row, col) =>
    INITIAL_FOOD.x === col && INITIAL_FOOD.y === row

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