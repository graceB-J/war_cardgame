import React from 'react';

function ScoreHistory(props) {
    return (
        <div className="scoreboard">
            <h3>ScoreBoard</h3>
            <p className="scores">
                Computer  <b>{props.scoreComputer}</b> : <b>{props.scoreYou}</b>   You
			</p>
        </div>
    )
}

export default ScoreHistory;