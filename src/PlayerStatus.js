import React from 'react';

function PlayerStatus(props) {
    let cards = props.cards;
    return (
        <div className={props.name == 'Computer' ? 'Computer' : 'You'}>
            <h1>{props.name}</h1>
            <p className='cards-left'>Cards Left: {props.numberOfCards}  </p>

        </div>
    );
};

export default PlayerStatus;