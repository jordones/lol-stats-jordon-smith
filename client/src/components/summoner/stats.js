import React from "react";

const Stats = props => {
  var kda = (props.stats.kills + props.stats.assists) / props.stats.deaths;

  return (
    <div className="ui segment">
      <div className="ui small header centered">
        {props.stats.kills} / {props.stats.deaths} / {props.stats.assists}
      </div>
      <div className="ui small header centered">
        {parseFloat(kda).toFixed(2)}
      </div>
    </div>
  );
};

export default Stats;
