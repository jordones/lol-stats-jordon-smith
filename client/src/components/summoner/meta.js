import React from "react";

const Meta = props => {
  return (
    <div className="ui segment">
      <div className="ui small header centered">{props.meta.gameMode}</div>
      <div className="ui divider" />

      <div className="ui small header centered">
        {props.meta.winStatus ? "Victory" : "Defeat"}
      </div>
      <div className="ui small header centered">
        {parseFloat(props.meta.gameDuration / 60).toFixed(2)}
      </div>
    </div>
  );
};

export default Meta;
