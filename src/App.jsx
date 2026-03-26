import { useSnake } from './hooks/useSnake'
import Board from './components/Board'
import './App.css'

function App() {
  const { snake, food, score, gameOver, resetGame } = useSnake()

  return (
    <div className="game-container">
      <h1>Snake Game</h1>
      <p className="score">Puntos: {score}</p>

      {gameOver && (
        <div className="game-over">
          <p>Game Over</p>
          <button onClick={resetGame}>Reiniciar</button>
        </div>
      )}

      <Board snake={snake} food={food} />
    </div>
  )
}

export default App