//ideally I'd make a pretty display for each Card but we'll see if I have time
import React from 'react';

const Card = props => {
    let playerPoss = (props.player == 'Computer' ? 'Computer\'s' : 'Your')
    return (
        <div className='card'>
            <p>{playerPoss} Card: {props.cardName} </p>
        </div>
    )
};

export default Card;