import React from 'react';
import Card from './Card';
// import Button from 'react-bootstrap/Button';

const Arena = props => {

    return (
        <div className="board" >
            <p> v v v v v v v v v v v v v  v v v v v v v v v v v v v</p>
            {/* <Button variant="primary" onClick={pickCards}> Flip </Button> */}
            <Card key={props.computerCard} player='Computer' cardName={props.computerCard} />
            <Card key={props.youCard} player='You' cardName={props.youCard} />
            <p>^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</p>
        </div>
    );
};

export default Arena;