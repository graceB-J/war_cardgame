import React from 'react';
import Card from './Card';
import Button from 'react-bootstrap/Button';


const Arena = props => {

    const pickCards = props => {
        let _self = this;
        let computerCard = props.computer.cards.shift();
        let youCard = props.you.cards.shift();
        this.state.computer.cardPlayed = computerCard;
        this.state.you.cardPlayed = youCard;
        this.setState(this.state);
        _self.compareValues();
    }
    //this is heckin long but it just determines who wins each battle and
    //adds the cards to the winner's deck
    const compareValues = () => {
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
    }

    const checkPreviousDraw = (player) => {
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


    return (
        <div className="board" >
            <p> v v v v v v v v v v v v v  v v v v v v v v v v v v v</p>
            <Button variant="primary" onClick={pickCards}> Flip </Button>
            <Card key={props.computerCard} player='Computer' cardName={props.computerCard} />
            <Card key={props.youCard} player='You' cardName={props.youCard} />
            <p>^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</p>
        </div>
    );
};

export default Arena;