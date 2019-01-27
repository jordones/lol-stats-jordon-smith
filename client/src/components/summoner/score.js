import React from "react";

const Score = props => {
  return (
    <div className="ui segment">
      <div className="ui small header centered">
        Level {props.stats.champLevel}
      </div>
      <div className="ui small header centered">
        {props.stats.creepScore} (
        {parseFloat(props.stats.creepScorePerMin).toFixed(2)}) CS
      </div>
    </div>
  );
};

export default Score;
