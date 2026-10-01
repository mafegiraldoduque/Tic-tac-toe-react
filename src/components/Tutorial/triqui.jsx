import { useState } from 'react';

function Square({ value, onSquareClick, isWinning }) {
  return (
    <button
      className={`square ${value ? 'filled' : ''} ${
        isWinning ? 'winning' : ''
      }`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // No permite jugar si ya hay ganador o la casilla está ocupada
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    onPlay(nextSquares);
  }

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningLine = winnerInfo ? winnerInfo.line : [];

  const isDraw = !winner && squares.every((square) => square !== null);

  let status;

  if (winner) {
    status = `¡Ganó ${winner}!`;
  } else if (isDraw) {
    status = '¡Empate!';
  } else {
    status = `Turno de ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game-container">

      {/* Estado del juego */}
      <div className="game-status">
        {winner ? (
          <div className="winner-message">
            <span className="trophy">🏆</span>
            <div>
              <span className="winner-title">¡Tenemos ganador!</span>
              <span className="winner-player">
                Jugador {winner} ha ganado
              </span>
            </div>
          </div>
        ) : isDraw ? (
          <div className="draw-message">
            <span>🤝</span>
            <div>
              <span className="winner-title">¡Empate!</span>
              <span className="winner-player">
                Nadie se rinde
              </span>
            </div>
          </div>
        ) : (
          <div className="turn-message">
            <span className={`turn-symbol ${xIsNext ? 'x-color' : 'o-color'}`}>
              {xIsNext ? 'X' : 'O'}
            </span>

            <div>
              <span className="turn-label">Es el turno de</span>
              <span className="turn-player">
                Jugador {xIsNext ? 'X' : 'O'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Tablero */}
      <div className="board">
        <div className="board-row">
          <Square
            value={squares[0]}
            isWinning={winningLine.includes(0)}
            onSquareClick={() => handleClick(0)}
          />
          <Square
            value={squares[1]}
            isWinning={winningLine.includes(1)}
            onSquareClick={() => handleClick(1)}
          />
          <Square
            value={squares[2]}
            isWinning={winningLine.includes(2)}
            onSquareClick={() => handleClick(2)}
          />
        </div>

        <div className="board-row">
          <Square
            value={squares[3]}
            isWinning={winningLine.includes(3)}
            onSquareClick={() => handleClick(3)}
          />
          <Square
            value={squares[4]}
            isWinning={winningLine.includes(4)}
            onSquareClick={() => handleClick(4)}
          />
          <Square
            value={squares[5]}
            isWinning={winningLine.includes(5)}
            onSquareClick={() => handleClick(5)}
          />
        </div>

        <div className="board-row">
          <Square
            value={squares[6]}
            isWinning={winningLine.includes(6)}
            onSquareClick={() => handleClick(6)}
          />
          <Square
            value={squares[7]}
            isWinning={winningLine.includes(7)}
            onSquareClick={() => handleClick(7)}
          />
          <Square
            value={squares[8]}
            isWinning={winningLine.includes(8)}
            onSquareClick={() => handleClick(8)}
          />
        </div>
      </div>

      {/* Texto inferior */}
      <div className="game-hint">
        {winner
          ? 'La partida ha terminado'
          : isDraw
          ? 'Intenta nuevamente'
          : 'Selecciona una casilla para jugar'}
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      nextSquares,
    ];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const winnerInfo = calculateWinner(currentSquares);
  const winner = winnerInfo ? winnerInfo.winner : null;

  const isDraw =
    !winner &&
    currentSquares.every((square) => square !== null);

  const moves = history.map((squares, move) => {
    let description;

    if (move > 0) {
      description = `Movimiento #${move}`;
    } else {
      description = 'Inicio del juego';
    }

    return (
      <li key={move}>
        <button
          className={move === currentMove ? 'active-move' : ''}
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="tic-tac-toe">

      {/* Encabezado */}
      <header className="game-header">
        <div className="game-icon">✦</div>

        <div>
          <h1>Tic-Tac-Toe</h1>
          <p>El clásico juego de tres en raya</p>
        </div>
      </header>

      {/* Jugadores */}
      <div className="players">

        <div
          className={`player-card ${
            xIsNext && !winner && !isDraw ? 'active-player x-player' : ''
          }`}
        >
          <span className="player-symbol x-symbol">X</span>

          <div>
            <span className="player-name">Jugador X</span>
            <span className="player-description">
              Cruces
            </span>
          </div>
        </div>

        <div
          className={`player-card ${
            !xIsNext && !winner && !isDraw
              ? 'active-player o-player'
              : ''
          }`}
        >
          <span className="player-symbol o-symbol">O</span>

          <div>
            <span className="player-name">Jugador O</span>
            <span className="player-description">
              Círculos
            </span>
          </div>
        </div>

      </div>

      {/* Juego */}
      <div className="game-layout">

        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />

        {/* Historial */}
        <aside className="game-history">
          <div className="history-header">
            <span>📋</span>
            <h2>Movimientos</h2>
          </div>

          <ol>{moves}</ol>

          <button className="reset-button" onClick={resetGame}>
            ↻ Nueva partida
          </button>
        </aside>

      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return {
        winner: squares[a],
        line: lines[i],
      };
    }
  }

  return null;
}