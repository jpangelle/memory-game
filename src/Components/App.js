import React, { Component } from 'react';
import _ from 'lodash';
import Board from './Board';
import Timer from './Timer';
import Footer from './Footer';
import boardData from '../utilities/boardData';
import '../styles/App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      board: _.shuffle(boardData),
      flipCount: 0,
      matchCount: 0,
      solved: false,
      time: 0,
      timerStatus: false,
    };
  }

  delay = async ms => {
    await new Promise(resolve => setTimeout(resolve, ms));
  };

  evaluateMatch = async currentFlip => {
    const { board, flipped, matchCount } = this.state;
    if (flipped.matchId === currentFlip.matchId) {
      return board.map(tile => {
        if (
          tile.uniqueId === flipped.uniqueId ||
          tile.uniqueId === currentFlip.uniqueId
        ) {
          return {
            ...tile,
            matched: true,
          };
        }
        this.setState({
          matchCount: matchCount + 1,
        });
        this.setSolve(matchCount);
        return tile;
      });
    } else {
      await this.delay(750);
      return board.map(tile => {
        return {
          ...tile,
          flipped: false,
        };
      });
    }
  };

  handleFlip = async uniqueId => {
    const { board, flipCount, flipped, timerStatus } = this.state;
    if (!timerStatus) {
      this.startTimer();
    }
    const currentFlip = board.find(tile => tile.uniqueId === uniqueId);
    if (currentFlip.matched || flipCount > 1) return;
    if (flipped && uniqueId === flipped.uniqueId) {
      const newBoard = this.makeNewBoard(uniqueId, false);
      this.setState({
        board: newBoard,
        flipped: undefined,
        flipCount: 0,
      });
      return;
    }
    const newBoard = this.makeNewBoard(uniqueId, true);
    this.setState({
      board: newBoard,
      flipped: currentFlip,
      flipCount: flipCount + 1,
    });
    if (flipped) {
      const updatedBoard = await this.evaluateMatch(currentFlip);
      this.setState({
        board: updatedBoard,
        flipped: undefined,
        flipCount: 0,
      });
    }
  };

  handleReset = () => {
    const { timerSetInterval } = this.state;
    clearInterval(timerSetInterval);
    this.setState({
      board: _.shuffle(boardData),
      flipCount: 0,
      matchCount: 0,
      solved: false,
      time: 0,
      timerStatus: false,
    });
  };

  handleSolve = () => {
    const { timerSetInterval } = this.state;
    clearInterval(timerSetInterval);
    this.setState({
      solved: true,
      timerStatus: false,
      flipCount: 0,
    });
  };

  makeNewBoard = (uniqueId, isFlipped) => {
    const { board } = this.state;
    return board.map(tile => {
      if (tile.uniqueId === uniqueId && !tile.matched) {
        return {
          ...tile,
          flipped: isFlipped,
        };
      }
      return tile;
    });
  };

  setSolve = matchCount => {
    if (matchCount === 14) {
      this.handleSolve();
    }
  };

  startTimer = () => {
    const { time } = this.state;
    this.setState({
      timerStatus: true,
    });
    const startTime = Date.now() - time;
    const timer = setInterval(() => {
      this.setState({ time: Date.now() - startTime });
    }, 10);
    this.setState({
      timerSetInterval: timer,
    });
  };

  render() {
    const { board, flipCount, matchCount, time } = this.state;

    return (
      <div className="App">
        <div className="header">Album Matching Game</div>
        <div className="board-container">
          <Board
            boardData={board}
            flipCount={flipCount}
            handleFlip={this.handleFlip}
          />
        </div>
        <div className="dashboard">
          <div className="matches">Matches: {matchCount}/15</div>
          <Timer time={time} />
          <div className="reset">
            <button className="reset-btn" onClick={this.handleReset}>
              Reset
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
