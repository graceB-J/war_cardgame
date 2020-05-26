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
  //setup
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
  }
  componentWillMount() {
    console.log('mounted');
    this.distributeCardsAtBeginningOfGame();
  }

  //helper
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




  checkNumberOfCards() {
    let totalNumberOfCards = this.state.computer.cards.length + this.state.you.cards.length + this.state.cardsToWin.length;
    if (totalNumberOfCards !== 52) {
      console.error('total num of cards is wrong: ', totalNumberOfCards);
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