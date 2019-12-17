import React from 'react';
import cn from 'classnames';
import './App.scss';

const generateboxes = () => {
  const result = [];

  for (let i = 1; i <= 9; i += 1) {
    result.push({
      id: i,
      content: '',
    });
  }

  return result;
};

const board = generateboxes();

class App extends React.Component {
  state = {
    turn: 'X',
    boxes: board,
    gameMoves: 0,
  };

  setBoxesContent = (id) => {
    this.setState(prevState => ({
      boxes: prevState.boxes.map((box) => {
        if (box.id !== id || box.content !== '') {
          return box;
        }

        return {
          id,
          content: prevState.turn,
        };
      }),
      turn: prevState.turn === 'X' ? 'O' : 'X',
      gameMoves: prevState.gameMoves + 1,
    }));
  };

  checkWinner = (boxes) => {
    const moves = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 5], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    for (let i = 0; i < moves.length; i += 1) {
      const [a, b, c] = moves[i];

      if (boxes[a].content === boxes[b].content
        && boxes[b].content === boxes[c].content
        && boxes[b].content !== ''
      ) {
        return boxes[b].content;
      }
    }

    return null;
  }

  setDefaultState = () => {
    this.setState({
      turn: 'X',
      boxes: board,
    });
  }

  render = () => {
    const { boxes, gameMoves } = this.state;
    const result = this.checkWinner(this.state.boxes);

    return (
      <div className="game">
        <h1 className="main-title">Tic Tac Toe Game</h1>

        <div className="game__boxes">
          {boxes.map(({ id, content }) => (
            <button
              className={cn(
                'game__box',
                `game__box--${id}`,
              )}
              key={id}
              type="button"
              onClick={() => this.setBoxesContent(id)}
              disabled={result}
            >
              {content}
            </button>
          ))}
        </div>

        <div className="game__message">
          {result && (`${result} has won!`)}
          {gameMoves === 9 && ('Draw!')}
        </div>

        <button
          className="game__new-game-btn"
          type="button"
          onClick={this.setDefaultState}
        >
          New game
        </button>
      </div>
    );
  }
}

export default App;
