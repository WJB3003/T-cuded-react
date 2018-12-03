import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      playerOne : '😇',
      playerTwo : '😈',
      winner: undefined
    }
    this.gameState = {
      turn : this.state.playerOne,
      gameEnded : false,
      board: Array(9).fill(''),
      totalMoves: 0
    }
  }

  winnerAction(input){
    if(input === this.state.playerOne){
        this.gameState.gameEnded = true
        this.setState({
          winner : this.state.playerOne,
          winnerLine: 'match won by ' + this.state.playerOne
        });
    }else if(input === this.state.playerTwo){
        this.gameEnded = true
        this.setState({
          winner : this.state.playerTwo,
          winnerLine: 'match won by ' + this.state.playerTwo
        });
    }else if(input === 'draw'){
        this.gameEnded = true
        this.setState({
          winner : 'draw',
          winnerLine : 'Match is draw'
        });
    }
  }

  checkIfEmpty(event){
      if(this.gameState.board[event.target.dataset.square] === '' && this.state.winner === undefined){
      this.gameState.board[event.target.dataset.square] = this.gameState.turn;
      event.target.innerText = this.gameState.turn;
      
      this.gameState.turn = this.gameState.turn === this.state.playerOne ? this.state.playerTwo : this.state.playerOne
      this.gameState.totalMoves++;
      event.target.dataset.turn = this.gameState.turn;
    }
  }

  clicked(event){
    this.checkIfEmpty(event)
    this.winnerAction(this.findWinner())
  }

  fullBoard(){
    if(this.gameState.totalMoves === 9){
        return 'draw';
    }
  }
  
  findWinner(){
    var moves = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    var board = this.gameState.board

    for(let i = 0; i < moves.length; i++){
      if(board[moves[i][0]] === board[moves[i][1]] && board[moves[i][1]] === board[moves[i][2]]){
        return board[moves[i][0]]
      }
    }

    return this.fullBoard()
  }

  render() {
     return(
        <div id="game">
          <div id="head"> T cubed App </div>
          <div id="board" onClick={(e)=>this.clicked(e)}>
            <div className="square" data-square="0"></div>
            <div className="square" data-square="1"></div>
            <div className="square" data-square="2"></div>
            <div className="square" data-square="3"></div>
            <div className="square" data-square="4"></div>
            <div className="square" data-square="5"></div>
            <div className="square" data-square="6"></div>
            <div className="square" data-square="7"></div>
            <div className="square" data-square="8"></div>
          </div>
          <div id="status">{this.state.winnerLine}</div>
        </div>
      );
  }
}

export default App;
