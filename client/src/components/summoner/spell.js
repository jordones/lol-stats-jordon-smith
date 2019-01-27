import React from "react";

const SpellData = props => {
  return (
    <div className="ui segment">
      <div className="ui tiny images centered">
        <img
          className="ui mini image"
          src={props.spell[0].imageurl}
          alt={props.spell[0].name}
        />
        <img
          className="ui mini image"
          src={props.spell[1].imageurl}
          alt={props.spell[1].name}
        />
      </div>
      <div className="ui tiny images centered">
        <img
          className="ui mini image"
          src={props.rune[0].imageurl}
          alt={props.rune[0].name}
        />
        <img
          className="ui mini image"
          src={props.rune[1].imageurl}
          alt={props.rune[1].name}
        />
      </div>
    </div>
  );
};

export default SpellData;
