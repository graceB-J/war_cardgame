import React, { Component } from 'react';
import './App.css';
import ScoreHistory from './ScoreHistory.js';
import PlayerStatus from './PlayerStatus.js';
import Arena from './Arena.js';

const CARDS = ['D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK', 'DA',
  'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK', 'CA',
  'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK', 'HA',
  'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK', 'SA']

class App extends Component {
  state = {
    computer: {
      'wins': 0,
      'cards': [],
      'cardPlayed': ''
    },
    you: {
      'wins': 0,
      'cards': [],
      'cardPlayed': '',
    },
    cardsToWin: []
  }
  //
  distributeCardsAtBeginningOfGame() {
    let deck = this.shuffle(CARDS);
    for (let i = 0; i < deck.length; i++) {
      if (i % 2 == 0) {
        this.state.computer.cards.push(deck[i]);
      } else {
        this.state.you.cards.push(deck[i]);
      }
    }

    this.setState(this.state);
    this.pickCards();
  }
  shuffle(cards) {
    let currIdx = cards.length, temporaryValue, randomIdx;

    while (0 !== currIdx) {
      randomIdx = Math.floor(Math.random() * currIdx);
      currIdx -= 1;

      temporaryValue = cards[currIdx];
      cards[currIdx] = cards[randomIdx];
      cards[randomIdx] = temporaryValue;
    }

    return cards;
  }
  componentWillMount() {
    console.log('mounted');
    this.distributeCardsAtBeginningOfGame();
  }
  pickCards() {
    let _self = this;
    let computerCard = this.state.computer.cards.shift();
    let youCard = this.state.you.cards.shift();
    this.state.computer.cardPlayed = computerCard;
    this.state.you.cardPlayed = youCard;
    this.setState(this.state);
    setTimeout(function () {
      _self.compareValues();
    }, 1000);
  }
  compareValues() {
    let computerCardValue = this.state.computer.cardPlayed.slice(1);
    let youCardValue = this.state.you.cardPlayed.slice(1);
    let computerCard = this.state.computer.cardPlayed;
    let youCard = this.state.you.cardPlayed;
    if (computerCardValue == youCardValue) {
      //draw
      console.log('draw');
      this.state.cardsToWin.push(computerCard);
      this.state.cardsToWin.push(youCard);
    } else if (computerCardValue === 'A') {
      this.state.computer.cards.push(computerCard);
      this.state.computer.cards.push(youCard);
      this.checkPreviousDraw('computer');
    } else if (youCardValue === 'A') {
      this.state.you.cards.push(computerCard);
      this.state.you.cards.push(youCard);
      this.checkPreviousDraw('you');
    } else if (computerCardValue === 'K') {
      this.state.computer.cards.push(computerCard);
      this.state.computer.cards.push(youCard);
      this.checkPreviousDraw('computer');
    } else if (youCardValue === 'K') {
      this.state.you.cards.push(computerCard);
      this.state.you.cards.push(youCard);
      this.checkPreviousDraw('you');
    } else if (computerCardValue === 'Q') {
      this.state.computer.cards.push(computerCard);
      this.state.computer.cards.push(youCard);
      this.checkPreviousDraw('computer');
    } else if (youCardValue === 'Q') {
      this.state.you.cards.push(computerCard);
      this.state.you.cards.push(youCard);
      this.checkPreviousDraw('you');
    } else if (computerCardValue === 'J') {
      this.state.computer.cards.push(computerCard);
      this.state.computer.cards.push(youCard);
      this.checkPreviousDraw('computer');
    } else if (youCardValue === 'J') {
      this.state.you.cards.push(computerCard);
      this.state.you.cards.push(youCard);
      this.checkPreviousDraw('you');
    } else {
      //both players have numbers
      let numberComputer = parseInt(computerCardValue);
      let numberYou = parseInt(youCardValue);
      if (numberComputer > numberYou) {
        this.state.computer.cards.push(computerCard);
        this.state.computer.cards.push(youCard);
        this.checkPreviousDraw('computer');
      } else if (numberYou > numberComputer) {
        this.state.you.cards.push(computerCard);
        this.state.you.cards.push(youCard);
        this.checkPreviousDraw('you');
      }
    }

    this.setState(this.state);
    this.checkNumberOfCards();

    this.pickCards();
  }
  checkPreviousDraw(player) {
    let arrayCards = this.state.cardsToWin;
    if (player === 'computer' && arrayCards.length > 0) {
      for (let i = 0; i < arrayCards.length; i++) {
        this.state.computer.cards.push(arrayCards[i]);
      }

    } else if (player === 'you' && arrayCards.length > 0) {
      for (let i = 0; i < arrayCards.length; i++) {
        this.state.you.cards.push(arrayCards[i]);
      }
    }
    this.state.cardsToWin = [];
    this.setState(this.state);
  }
  checkNumberOfCards() {
    let totalNumberOfCards = this.state.computer.cards.length + this.state.you.cards.length + this.state.cardsToWin.length;
    if (totalNumberOfCards !== 52) {
      console.error('NOT THE GOOD NUMBER OF CARDS:', totalNumberOfCards);
    } else if (this.state.computer.cards.length === 0) {
      alert('You WON!');
      this.state.you.wins += 1;
      this.setState(this.state);
      this.distributeCardsAtBeginningOfGame();
    } else if (this.state.you.cards.length === 0) {
      alert('You LOST!');
      this.state.computer.wins += 1;
      this.setState(this.state);
      this.distributeCardsAtBeginningOfGame();
    }
  }
  //
  render() {
    return (
      <div className="App" >
        <ScoreHistory
          scoreComputer={this.state.computer.wins}
          scoreYou={this.state.you.wins} />
        <div className='playerBoard'>
          <PlayerStatus id='computer' name="Computer" numberOfCards={this.state.computer.cards.length} cards={this.state.computer.cards} />
          <Arena
            computerCard={this.state.computer.cardPlayed}
            youCard={this.state.you.cardPlayed} />
          <PlayerStatus id='you' name="You" numberOfCards={this.state.you.cards.length} cards={this.state.you.cards} />
          <p className='title'>THIS IS <b>WAR</b></p>
        </div>
      </div>
    );
  }
}

export default App;