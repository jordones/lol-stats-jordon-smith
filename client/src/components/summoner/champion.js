import React from "react";

const Champion = props => {
  return (
    <div className="ui segment">
      <img
        className="ui centered tiny circular image"
        src={props.champion.imageurl}
        alt={props.champion.name}
      />
      <div className="ui medium header centered">{props.champion.name}</div>
    </div>
  );
};

export default Champion;
