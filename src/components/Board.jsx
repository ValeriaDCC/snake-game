const ROWS = 17
const COLS = 17

function Board({ snake, food }) {
  const isSnake = (row, col) =>
    snake.some(s => s.x === col && s.y === row)

  const isFood = (row, col) =>
    food.x === col && food.y === row

  return (
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
  )
}

export default Board